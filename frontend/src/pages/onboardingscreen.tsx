// import { useNavigate } from "react-router"

import Header from "../components/header"


const Onboardingscreen: React.FC = () => {
  // const navigate = useNavigate();

  setTimeout(() => {
    // navigate('/signin')
  }, 3000)
  
  return (
    <main className="grid grid-rows-12 bg-text h-screen w-full text-primary py-2 px-5">
      <Header />
      <div className="row-span-11 flex flex-col justify-center items-center gap-8">
        <img src="/assets/Rocket.svg" alt="rocket" width={150} />
        <button className="w-4/5 h-12 bg-primary text-text rounded-2xl">GETTING STARTED</button>
        <p className="w-4/5 text-center">Connect your wallet, explore your dashboard, and start sending or receiving payments - securely, instantly, and without limits.</p>
      </div>
    </main>
  )
}

export default Onboardingscreen
