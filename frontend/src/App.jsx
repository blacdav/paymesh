import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen.jsx';
import Onboarding from './components/Onboarding.jsx';
import Navigation from './components/Navigation.jsx';
import Dashboard from './pages/Dashboard.jsx';
import FlowBuilder from './pages/FlowBuilder.jsx';
import Templates from './pages/Templates.jsx';
import History from './pages/History.jsx';
import { useWallet } from './context/WalletContext.jsx';

function App() {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { connected } = useWallet();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('onboardingComplete');
    if (hasCompletedOnboarding) {
      setShowOnboarding(false);
    }
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={() => {
      setShowOnboarding(false);
      localStorage.setItem('onboardingComplete', 'true');
    }} />;
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'builder':
        return <FlowBuilder />;
      case 'templates':
        return <Templates />;
      case 'history':
        return <History />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Navigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <main className="main-content">
        {connected ? (
          renderPage()
        ) : (
          <div className="connect-wallet-message">
            <h2>Connect Your Wallet</h2>
            <p>Please connect your Sui wallet to access PayMesh's features</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;