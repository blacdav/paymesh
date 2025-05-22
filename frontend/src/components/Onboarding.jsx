import { useState } from 'react';
import { useWallet } from '../context/WalletContext.jsx';
import { HiPlusCircle } from "react-icons/hi";
import { RiFolderTransferFill } from "react-icons/ri";

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showCreateWalletForm, setShowCreateWalletForm] = useState(false);
  const [registerType, setRegisterType] = useState(null);
  const { connectWallet, walletConnected } = useWallet();

  const steps = [
    {
      title: 'WELCOME TO PAYMESH',
      description: 'Experience pure freedom—no banks, no borders, just pure freedom. Let’s get started.',
      icon: <img src='/thumb.svg' alt='thumb' />,
      buttonText: 'Getting Started',
    },
    {
      title: 'Fast & Secure Payments',
      description: 'Connect your wallet, explore your dashboard, and start sending or receiving payments—securely, instantly, and without limits.',
      icon: <img src='/Rocket.svg' alt='rocket' />,
      buttonText: 'Continue',
    },
    {
      title: 'Connect Your Wallet',
      description: 'Your wallet is your gateway to decentralized payments—no signups, just seamless access.',
      icon: <img src='/wallet.svg' alt='wallet' />,
      buttonText: walletConnected ? 'Wallet Connected' : 'Connect Wallet',
    },
    {
      description: 'Register as',
      buttonText: 'Individual',
      buttonText2: 'Business',
    },
  ];

  const handleNext = async () => {
    if (step === 2 && !walletConnected) {
      const result = await connectWallet('suiet');
      if (result) {
        setStep(step + 1);
      } else {
        alert('Failed to connect wallet. Make sure Suiet wallet is installed and approved.');
      }
      return;
    }

    if (step === steps.length - 1) {
      onComplete();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="onboarding-icon-wrapper">{steps[step].icon}</div>
        <h1 className="onboarding-title">{steps[step].title}</h1>
        <p className="onboarding-description">{steps[step].description}</p>

        {step < steps.length - 1 && (
          <button
            className="onboarding-button"
            onClick={handleNext}
            disabled={step === 2 && walletConnected}
          >
            {steps[step].buttonText}
          </button>
        )}

        {step === steps.length - 1 && (
          <>
            <button
              className="onboarding-button"
              onClick={() => {
                setRegisterType('individual');
                setShowWalletModal(true);
              }}
            >
              {steps[step].buttonText}
            </button>
            <hr className="onboarding-divider" />
            <button
              className="onboarding-button2"
              onClick={() => {
                setRegisterType('business');
                setShowWalletModal(true);
              }}
            >
              {steps[step].buttonText2}
            </button>
          </>
        )}

        <div className="onboarding-dots">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === step ? 'active' : ''}`}
              onClick={() => setStep(index)}
            />
          ))}
        </div>
      </div>

      {/* Wallet Modal Side Panel */}
      {showWalletModal && (
        <div className="wallet-modal-overlay">
          <div className="wallet-side-panel">
            {!showCreateWalletForm ? (
              <>
                <button className="close-modal" onClick={() => setShowWalletModal(false)}>✖</button>
                <h2 className="modal-title">Choose Your Wallet</h2>
                <p className="modal-description">
                By connecting your wallet you agree to our <span>Terms of Service</span> and our <span>Privacy Policy</span>
                </p>

                <button className="wallet-btn" onClick={() => setShowCreateWalletForm(true)}>
                  <HiPlusCircle className='icon'/>Create New Wallet
                </button>
                <button className="wallet-btn secondary"><RiFolderTransferFill className='icon'/>Import Existing Wallet</button>
              </>
            ) : (
              <>
                <button className="back-btn" onClick={() => setShowCreateWalletForm(false)}>← Back</button>
                <button className="close-modal" onClick={() => setShowWalletModal(false)}>✖</button>
                <h2 className="modal-title">Create New Wallet</h2>
                <form className="wallet-form">
                  <input type="text" placeholder="Name of Employee" required />
                  <input type="text" placeholder="Wallet Address" required />
                  <input type="text" placeholder="Salary Amount" required />
                  <input type="text" placeholder="Payment Frequency" required />
                  <p className='form-text'>Make Sure to Confirm Details Before continuing this page</p>
                  <button className="wallet-btn last" type="submit">Continue</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Onboarding;
