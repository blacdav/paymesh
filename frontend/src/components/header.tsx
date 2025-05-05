import { IoNotifications } from "react-icons/io5"

const Header: React.FC = () => {
  return (
    <header className="row-span-1 flex justify-between items-center">
      <img src="/assets/paymesh-full-logo.svg" alt="paymesh-full-logo" width={100} className="" />
      <div className="flex gap-2">
        <IoNotifications className="text-secondary" />
        <p>o</p>
      </div>
    </header>
  )
}

export default Header
