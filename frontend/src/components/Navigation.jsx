import { useWallet } from '../context/WalletContext.jsx';

function Navigation({ currentPage, setCurrentPage }) {
  const { connectWallet } = useWallet();

  return (
    <nav className="navigation">
      <div className="nav-logo">
        <span>PayMesh</span>
      </div>
      
      <div className="nav-links">
        <button 
          className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentPage('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-link ${currentPage === 'builder' ? 'active' : ''}`}
          onClick={() => setCurrentPage('builder')}
        >
          Flow Builder
        </button>
        <button 
          className={`nav-link ${currentPage === 'templates' ? 'active' : ''}`}
          onClick={() => setCurrentPage('templates')}
        >
          Templates
        </button>
        <button 
          className={`nav-link ${currentPage === 'history' ? 'active' : ''}`}
          onClick={() => setCurrentPage('history')}
        >
          History
        </button>
      </div>
      
      <div className="wallet-section">
        {connected ? (
          <div className="wallet-info">
            <div className="wallet-address">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
            <button className="disconnect-button" onClick={disconnectWallet}>
              Disconnect
            </button>
          </div>
        ) : (
          <button 
            className={`connect-button ${loading ? 'loading' : ''}`} 
            onClick={connectWallet}
            disabled={loading}
          >
            {loading ? 'Connecting...' : 'Connect Slush'}
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;