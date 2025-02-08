import { Lucid, fromHex, toHex, C } from 'lucid-cardano';

export type Network = 'Mainnet' | 'Preview' | 'Preprod';

export interface WalletInfo {
  address: string;
  network: Network;
}

export interface ScriptDeployment {
  scriptAddress: string;
  txHash: string;
  datum?: string;
}

const NETWORK_CONFIGS = {
  Mainnet: "https://cardano-mainnet.blockfrost.io/api/v0",
  Preview: "https://cardano-preview.blockfrost.io/api/v0",
  Preprod: "https://cardano-preprod.blockfrost.io/api/v0"
};

// Network prefixes for address generation
const NETWORK_PREFIXES = {
  Mainnet: 1,
  Preview: 0,
  Preprod: 0
};

class WalletService {
  private lucid: Lucid | null = null;
  private walletAddress: string | null = null;
  private currentNetwork: Network = 'Mainnet';

  async connect(walletName: string = 'eternl', network: Network = 'Mainnet'): Promise<WalletInfo> {
    try {
      this.currentNetwork = network;
      
      // Initialize Lucid with the selected network provider
      this.lucid = await Lucid.initialize(
        network,
        NETWORK_CONFIGS[network]
      );
      
      const wallet = await this.lucid.selectWallet(walletName);
      this.walletAddress = await wallet.getAddress();

      return {
        address: this.walletAddress,
        network: this.currentNetwork
      };
    } catch (error: any) {
      throw new Error(`Wallet connection failed: ${error.message}`);
    }
  }

  async deployScript(plutusScript: string): Promise<ScriptDeployment> {
    if (!this.lucid || !this.walletAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const scriptCBOR = this.convertScriptToCBOR(plutusScript);
      const validator = await this.lucid.utils.validatorToAddress(scriptCBOR);
      const minAda = BigInt(2000000); // 2 ADA minimum

      const tx = await this.lucid
        .newTx()
        .payToContract(validator, { inline: Date.now().toString() }, { lovelace: minAda })
        .attachPlutusScript(scriptCBOR)
        .complete();

      const signedTx = await tx.sign().complete();
      const txHash = await signedTx.submit();
      await this.lucid.awaitTx(txHash);

      const scriptAddress = this.generateScriptAddress(scriptCBOR);

      return {
        scriptAddress,
        txHash,
        datum: Date.now().toString()
      };
    } catch (error: any) {
      throw new Error(`Script deployment failed: ${error.message}`);
    }
  }

  private convertScriptToCBOR(plutusScript: string): string {
    try {
      const scriptObject = JSON.parse(plutusScript);
      return toHex(C.PlutusScript.new(fromHex(scriptObject.cborHex)).to_bytes());
    } catch (error: any) {
      throw new Error(`Failed to convert script to CBOR: ${error.message}`);
    }
  }

  private generateScriptAddress(scriptCBOR: string): string {
    if (!this.lucid) throw new Error('Lucid not initialized');

    try {
      const scriptHash = this.lucid.utils.validatorToScriptHash(scriptCBOR);
      // Use network-aware address generation
      const networkPrefix = NETWORK_PREFIXES[this.currentNetwork];
      const scriptAddress = this.lucid.utils.credentialToAddress(
        { type: "Script", hash: scriptHash },
        undefined,
        networkPrefix
      );

      // Verify the address format is correct for the network
      this.verifyAddressFormat(scriptAddress);

      return scriptAddress;
    } catch (error: any) {
      throw new Error(`Failed to generate script address: ${error.message}`);
    }
  }

  private verifyAddressFormat(address: string): void {
    // Verify the address has the correct prefix for the network
    const prefix = address.startsWith('addr') ? 'addr' : 'addr_test';
    const expectedPrefix = this.currentNetwork === 'Mainnet' ? 'addr' : 'addr_test';
    
    if (prefix !== expectedPrefix) {
      throw new Error(`Invalid address format for ${this.currentNetwork}. Expected prefix ${expectedPrefix} but got ${prefix}`);
    }
  }

  async getUtxos(address: string) {
    if (!this.lucid) throw new Error('Lucid not initialized');
    return await this.lucid.utxosAt(address);
  }

  getCurrentNetwork(): Network {
    return this.currentNetwork;
  }

  isConnected(): boolean {
    return this.lucid !== null && this.walletAddress !== null;
  }

  getAddress(): string | null {
    return this.walletAddress;
  }
}

export const walletService = new WalletService();