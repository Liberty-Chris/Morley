
import { useState } from 'react';
import ArkRedeem from './ArkRedeem';

const ArkWriterMain = () => {
    const [showArkRedeem, setShowArkRedeem] = useState(false);

    return (
        <div>
            <h1>ArkWriter</h1>
            <button onClick={() => setShowArkRedeem(true)}>
                Open ArkRedeem (UTXO Migration)
            </button>

            {showArkRedeem && (
                <div className="arkredeem-modal">
                    <div className="arkredeem-content">
                        <button onClick={() => setShowArkRedeem(false)}>Close</button>
                        <ArkRedeem />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArkWriterMain;
