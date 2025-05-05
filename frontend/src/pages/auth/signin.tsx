import Header from "../../components/header"
import LoaderModal from "../../modals/loader"
import WalletModal from "../../modals/walletmodal"

const Signin: React.FC = () => {
  return (
    <>
      <div className="h-dvh w-full p-2">
        <Header />
        <section className="p-2">
          SIGN IN
        </section>
      </div>
      <WalletModal />
      <LoaderModal />
    </>
  )
}

export default Signin