import React, { useState } from 'react'

const WalletModal: React.FC = () => {
    const [closeWalletModal, setCloseWalletModal] = useState(true);

    const closeModal = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

        if(target.id == 'wrapper') {
            setCloseWalletModal(false);
        }
    }

  return (
    <section onClick={() => closeModal} id='wrapper' className={`${closeWalletModal ? 'flex' : 'hidden'} bg-black/50 backdrop-blur-xs inset-0 h-screen w-full absolute items-end`}>
      <div className='h-1/5 w-full bg-white bottom-0 rounded-t-2xl p-5 flex items-center justify-center'>
        <button className='bg-primary text-white py-3 px-5 rounded-xl'>connect wallet</button>
      </div>
    </section>
  )
}

export default WalletModal
