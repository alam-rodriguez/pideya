// React
import React from 'react';

// React Icons
import { HiPlusCircle } from 'react-icons/hi';

// Reatc Router
import { useNavigate } from 'react-router-dom';

const AddSection = () => {
  const navigate = useNavigate();

  const handleClickAddArtice = () => navigate('/admin-options');

  return (
    <section className='w-100 pb-5'>
      <div className='bg-black me-4 rounded-5 d-flex justify-content-center align-items-center' style={{height:70, minWidth:'100%'}} onClick={handleClickAddArtice}>
        <HiPlusCircle className='text-white display-1' />
        <p className='m-0 text-white fs-1 fw-bold'>Agregar Articulo</p>  
      </div>
      <p className='text-center fs-3'>Eres admin</p>
    </section>
  );
}

export default AddSection;
