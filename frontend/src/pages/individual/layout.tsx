import { Outlet } from 'react-router'
import Navigation from '../../components/navigation'

const IndividualLayout: React.FC = () => {
  return (
    <main className='bg-text h-screen w-full text-xs'>
      <Outlet />
      <Navigation />
    </main>
  )
}

export default IndividualLayout