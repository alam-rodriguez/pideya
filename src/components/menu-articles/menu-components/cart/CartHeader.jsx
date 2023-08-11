import React from 'react';

// React-Icons
import { IoIosArrowBack } from 'react-icons/io';

const CartHeader = ({handleClickBack}) => {

  return (
    <header className='shadow py-3 border-bottom border-secondary position-fixed w-100 bg-white z-2'>
      <IoIosArrowBack className='position-absolute display-4' onClick={handleClickBack} />
      <h1 className='text-center m-0'>Caja</h1>
    </header>
  )
}

export default CartHeader
