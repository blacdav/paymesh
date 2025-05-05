import React, { useState } from 'react'

const LoaderModal: React.FC = () => {
    const [loading, setIsLoading] = useState(false);

    const closeModal = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

        if(target.id == 'wrapper') {
            setIsLoading(true);
        }
    }

  return (
    <section onClick={() => closeModal} id='wrapper' className={`${loading ? 'flex' : 'hidden'} bg-black/50 inset-0 backdrop-blur-xs h-screen w-full absolute items-center justify-center`}>
      <img src="/assets/Paymesh-logo.svg" alt="paymesh-logo" width={100} className='flex items-center justify-center animate-pulse' />
    </section>
  )
}

export default LoaderModal
