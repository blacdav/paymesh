import { Outlet } from "react-router"
import Navigation from "../../components/navigation"

const BusinessLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
      <Navigation />
    </div>
  )
}

export default BusinessLayout
