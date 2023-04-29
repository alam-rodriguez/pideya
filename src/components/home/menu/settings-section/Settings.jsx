import React, { useContext } from 'react';

// React Icons
import { GrFacebookOption } from 'react-icons/gr';
import { IoIosArrowBack } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { TfiEmail } from 'react-icons/tfi'
import { RiAdminFill } from 'react-icons/ri'


// React Router
import { useNavigate } from 'react-router-dom';

// Firebase 
import {  } from '../../../../firebase/firebase';

// Contetx
import { AppContext } from '../../../../context/AppContext';


const Settings = () => {
  const navigate = useNavigate();

  const { setIsAdmin } = useContext(AppContext); 

  const handleClickBack = () => navigate('/home');

  const handleChangeBeAdmin = (e) => {
    if(e.target.value == 'aabbccdd112233'){
      console.log('seras Admin');
      setIsAdmin(true);
    }
  }

  return (
    <section className='d-flex flex-column col-9 mt-5'>
      {/* Para ingresar como admin */}
      <input type="text" className='position-absolute end-0 top-0 border-0' style={{width:'5px'}} onChange={handleChangeBeAdmin} />
      
      <IoIosArrowBack className='position-absolute top-0 start-0 mt-4 display-4' onClick={handleClickBack} />

      <h2 className='display-1 fw-bold mb-5'>Ajustes</h2>

      
      <p className='position-absolute bottom-0 w-75 text-center'>Nostrud adipisicing labore laboris amet non sint laboris aute nulla cillum est voluptate.</p>
    </section>
  )
}

export default Settings
