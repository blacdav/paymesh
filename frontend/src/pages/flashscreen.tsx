import { useNavigate } from "react-router";

const Flashscreen: React.FC = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/onboarding')
  }, 3000)

  return (
    <div className="bg-dark-shade h-screen w-full text-text p-2 flex justify-center items-center">
      <img src="/assets/paymesh-full-logo.svg" alt="paymesh-full-logo" width={200} />
    </div>
  )
}

export default Flashscreen
