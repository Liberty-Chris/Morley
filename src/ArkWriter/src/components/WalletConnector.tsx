import React, { useState, useRef, useEffect } from 'react';
import { walletService, Network } from '../services/WalletService';
import { Loader2, Globe, ChevronDown } from 'lucide-react';

interface WalletConnectorProps {
  onWalletConnected: (address: string) => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ onWalletConnected }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>('Mainnet');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      const walletInfo = await walletService.connect('eternl', selectedNetwork);
      onWalletConnected(walletInfo.address);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const networks: Network[] = ['Mainnet', 'Preprod', 'Preview'];

  return (
    <div className="flex items-center gap-4">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={isConnecting}
          className="flex items-center gap-2 bg-black text-white px-3 py-1 text-sm rounded-md border border-white hover:bg-orange-500"
        >
          <Globe className="w-4 h-4" />
          <span>{selectedNetwork}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-50">
            {networks.map((network) => (
              <button
                key={network}
                onClick={() => {
                  setSelectedNetwork(network);
                  setIsDropdownOpen(false);
                }}
                className={`w-full px-3 py-1 text-sm text-left ${
                  network === selectedNetwork
                    ? 'bg-[#FF7F11] text-white'
                    : 'text-black hover:bg-gray-700 hover:text-white'
                } transition-colors duration-150`}
              >
                {network}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="flex items-center gap-2 bg-black text-white px-3 py-1 text-sm rounded-md border border-white hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isConnecting && <Loader2 className="w-4 h-4 animate-spin" />}
        <span>Connect Wallet</span>
      </button>
    </div>
  );
};

export default WalletConnector;