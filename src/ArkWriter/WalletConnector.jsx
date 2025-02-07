
import { useState, useEffect } from 'react';

const WalletConnector = () => {
    const [wallets, setWallets] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [connected, setConnected] = useState(false);
    const [balance, setBalance] = useState(null);
    const [stakeAddress, setStakeAddress] = useState(null);
    const [txHash, setTxHash] = useState(null);

    useEffect(() => {
        // Detect available wallets
        if (window.cardano) {
            setWallets(Object.keys(window.cardano).filter(name => window.cardano[name].enable));
        }
    }, []);

    const connectWallet = async (walletName) => {
        try {
            const wallet = window.cardano[walletName];
            const api = await wallet.enable();
            setSelectedWallet(api);
            setConnected(true);

            // Fetch wallet information
            const balance = await api.getBalance();
            const rewardAddr = await api.getRewardAddresses();
            
            setBalance(balance);
            setStakeAddress(rewardAddr.length ? rewardAddr[0] : "N/A");

        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    };

    const signAndSubmitTransaction = async () => {
        if (!selectedWallet) {
            console.error("No wallet connected.");
            return;
        }

        try {
            const tx = {
                tx: "PLACEHOLDER_RAW_TX", // Replace with actual transaction data
            };

            // Sign the transaction
            const signedTx = await selectedWallet.signTx(tx.tx, true);

            // Submit transaction
            const submittedTxHash = await selectedWallet.submitTx(signedTx);
            setTxHash(submittedTxHash);
            console.log("Transaction submitted:", submittedTxHash);

        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    return (
        <div>
            <h2>Connect Your Cardano Wallet</h2>
            {wallets.length === 0 ? (
                <p>No CIP-30 compatible wallets detected.</p>
            ) : (
                <div>
                    {wallets.map((walletName) => (
                        <button key={walletName} onClick={() => connectWallet(walletName)}>
                            Connect {walletName}
                        </button>
                    ))}
                </div>
            )}

            {connected && (
                <div>
                    <h3>Wallet Connected</h3>
                    <p>Stake Address: {stakeAddress}</p>
                    <p>Balance: {balance} lovelace</p>

                    <button onClick={signAndSubmitTransaction}>
                        Deploy Smart Contract (Sign & Submit Tx)
                    </button>

                    {txHash && <p>Transaction Submitted: {txHash}</p>}
                </div>
            )}
        </div>
    );
};

export default WalletConnector;
