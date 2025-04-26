import { useNavigate } from "react-router";

const Flashscreen: React.FC = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/onboarding')
  }, 3000)

  return (
    <div className="bg-dark-shade h-screen w-full text-text p-2 flex justify-center items-center">
      FLASHSCREEN
    </div>
  )
}

export default Flashscreen
