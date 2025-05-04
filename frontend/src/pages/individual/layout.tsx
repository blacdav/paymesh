import { Outlet } from 'react-router'
import Navigation from '../../components/navigation'
import LoaderModal from '../../modals/loader'

const IndividualLayout: React.FC = () => {
  return (
    <>
      <main className='bg-text h-screen w-full text-xs'>
        <Outlet />
        <Navigation />
      </main>
      <LoaderModal />
    </>
  )
}

export default IndividualLayout