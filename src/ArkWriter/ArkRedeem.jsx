
import { useState } from 'react';

const ArkRedeem = ({ walletApi }) => {
    const [lockedUTXOs, setLockedUTXOs] = useState([]);
    const [migrationStatus, setMigrationStatus] = useState(null);

    const scanLockedUTXOs = async () => {
        if (!walletApi) {
            console.error("Wallet not connected.");
            return;
        }

        try {
            const utxos = await walletApi.getUtxos(); // Fetch all UTXOs
            const filteredUTXOs = utxos.filter(utxo => {
                // Replace with actual logic to detect UTXOs from old contract versions
                return utxo.scriptAddress === "OLD_CONTRACT_ADDRESS";
            });
            setLockedUTXOs(filteredUTXOs);
        } catch (error) {
            console.error("Error scanning UTXOs:", error);
        }
    };

    const migrateUTXOs = async () => {
        if (!walletApi || lockedUTXOs.length === 0) {
            console.error("No UTXOs available for migration.");
            return;
        }

        try {
            const tx = {
                inputs: lockedUTXOs.map(utxo => ({
                    txHash: utxo.txHash,
                    index: utxo.index
                })),
                outputs: [
                    {
                        address: "NEW_CONTRACT_ADDRESS",
                        value: lockedUTXOs.reduce((sum, utxo) => sum + utxo.value, 0)
                    }
                ]
            };

            // Sign the migration transaction
            const signedTx = await walletApi.signTx(tx, true);

            // Submit the transaction
            const txHash = await walletApi.submitTx(signedTx);
            setMigrationStatus(`Migration successful! TX Hash: ${txHash}`);

        } catch (error) {
            console.error("Migration failed:", error);
            setMigrationStatus("Migration failed. Check console for details.");
        }
    };

    return (
        <div>
            <h2>ArkRedeem: UTXO Migration</h2>
            <button onClick={scanLockedUTXOs}>Scan Locked UTXOs</button>

            {lockedUTXOs.length > 0 && (
                <div>
                    <h3>Locked UTXOs Detected</h3>
                    <ul>
                        {lockedUTXOs.map((utxo, index) => (
                            <li key={index}>TX Hash: {utxo.txHash} - Amount: {utxo.value} ADA</li>
                        ))}
                    </ul>
                    <button onClick={migrateUTXOs}>Migrate to New Contract</button>
                </div>
            )}

            {migrationStatus && <p>{migrationStatus}</p>}
        </div>
    );
};

export default ArkRedeem;
