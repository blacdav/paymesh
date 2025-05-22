import { useEffect, useState } from 'react';

function SplashScreen() {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationStage(1);
    }, 500);
    
    const timer2 = setTimeout(() => {
      setAnimationStage(2);
    }, 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="splash-screen">
      <div className={`splash-logo ${animationStage >= 1 ? 'animated' : ''}`}>
        <div className="logo-icon">
          <img src="/splash-logo.svg" alt="Logo" />
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;