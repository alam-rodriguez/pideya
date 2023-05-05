import React from 'react';

// React Icons
import { MdOutlineNavigateNext } from 'react-icons/md';

const UseCode = () => {

  const handleClickUseCode = () => {
    console.log('Ejecutandolo');
  }

  return (
    <section className='w-100 my-5 me-4 rounded-5 d-flex justify-content-center align-items-center' style={{height:70, minWidth:'100%', background:'black'}} onClick={handleClickUseCode}>
      <p className='text-white m-0 fs-3 fw-bold'>USAR CODIGO PROMOCIONAL</p>
      <MdOutlineNavigateNext className='display-4 text-white'/>    
    </section>
  )
}

export default UseCode
