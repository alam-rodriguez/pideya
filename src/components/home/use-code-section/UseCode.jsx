import React, { useState } from 'react';

// React Icons
import { MdOutlineNavigateNext } from 'react-icons/md';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Components
import SearchCodeRef from '../code-ref-section/SearchCodeRef';

const UseCode = ({viewSearchCode, setViewSearchCode}) => {
  

  // const handleClickUseCode = () => navigate('/home/search-code-ref');

  const handleClickUseCode = () => setViewSearchCode(true);

    return (
      <>
        <section className='w-100 my-5 me-4 rounded-4 d-flex justify-content-center align-items-center' style={{height:70, minWidth:'100%', background:'#831700'}} onClick={handleClickUseCode}>
          <p className='text-white m-0 fs-5 fw-bold'>USAR CODIGO PROMOCIONAL</p>
          <MdOutlineNavigateNext className='display-4 text-white'/>    
        </section>
        <SearchCodeRef viewSearchCode={viewSearchCode} setViewSearchCode={setViewSearchCode} />
      </>
    );
}

export default UseCode;