import { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export function useWallet() {
  return useContext(WalletContext);
}

export function WalletProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletProvider, setWalletProvider] = useState(null);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  // Check if Slush wallet exists in the window object
  const checkWalletExists = () => {
    return window.slush;
  };

  // Function to connect wallet
  const connectWallet = async () => {
    try {
      setLoading(true);
      
      // Check if wallet provider exists
      const walletExists = checkWalletExists();
      
      if (!walletExists) {
        alert('Slush wallet not found. Please install the Slush wallet extension.');
        setLoading(false);
        return;
      }
      
      const provider = window.slush;
      
      // Request connection
      const response = await provider.connect();
      
      if (response.success) {
        setWalletProvider(provider);
        setWalletAddress(response.accounts[0]);
        setConnected(true);
        
        // Get account balance
        await updateBalance(response.accounts[0], provider);
      } else {
        console.error('Failed to connect wallet:', response.error);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to disconnect wallet
  const disconnectWallet = async () => {
    try {
      if (walletProvider) {
        await walletProvider.disconnect();
      }
      setWalletProvider(null);
      setWalletAddress('');
      setBalance(0);
      setConnected(false);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  // Function to update balance
  const updateBalance = async (address, provider) => {
    try {
      if (!address || !provider) return;
      
      const balanceResponse = await provider.getBalance();
      if (balanceResponse.success) {
        setBalance(balanceResponse.balance);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  // Check for existing connection on initial load
  useEffect(() => {
    const checkExistingConnection = async () => {
      const walletExists = checkWalletExists();
      
      if (walletExists) {
        const provider = window.slush;
        
        try {
          const status = await provider.isConnected();
          
          if (status.connected) {
            setWalletProvider(provider);
            setWalletAddress(status.accounts[0]);
            setConnected(true);
            await updateBalance(status.accounts[0], provider);
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };
    
    checkExistingConnection();
  }, []);

  const value = {
    connected,
    walletAddress,
    walletProvider,
    balance,
    loading,
    connectWallet,
    disconnectWallet,
    updateBalance
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}