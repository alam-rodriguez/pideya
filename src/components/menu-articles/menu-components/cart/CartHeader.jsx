import React from 'react';

import { IoIosArrowBack } from 'react-icons/io';

const CartHeader = ({setViewCart}) => {

  const handleClickBack = () => setViewCart(false);

  return (
    <header className='pt-4 pb-2 border-bottom border-secondary position-fixed w-100 bg-white z-2'>
      <IoIosArrowBack className='position-absolute display-4' onClick={handleClickBack} />
      <h1 className='text-center'>Caja</h1>
    </header>
  )
}

export default CartHeader
