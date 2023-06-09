import React, { useContext } from 'react';

// React Icons
import { GrFacebookOption } from 'react-icons/gr';
import { IoIosArrowBack } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { TfiEmail } from 'react-icons/tfi'
import { RiAdminFill } from 'react-icons/ri'

// Components
import SingInButton from './SingInButton';

// React Router
import { useNavigate } from 'react-router-dom';

// Firebase 
import { registrarAdmin } from '../../../../firebase/firebaseAuthGoogle';
import { existAdmin } from '../../../../firebase/firebaseFirestore';
// import { existAdmin, registrarAdmin, registrarUsuario } from '../../../../firebase/firebase';

// Contetx
import { AppContext } from '../../../../context/AppContext';

const SignInLikeAdmin1 = () => {
  const navigate = useNavigate();

  const { isAdmin } = useContext(AppContext); 

  const handleClickBack = () => navigate('/home');

  const logUserAdmin = async () => {
    const res = await existAdmin();
    if( res == false){
      await registrarAdmin();
      navigate('/registro-like-admin/details-app');
    }else {
      console.log('Lo siento pero no se puede cambiar el admin de la app una vez creado, para mas informacion comuniquese con el desarrollador');
    }
  }

  return (
    <section className='d-flex justify-content-center flex-column align-items-center col-9 m-auto mt-5 vh-100'>
      
      {/* <IoIosArrowBack className='position-absolute top-0 start-0 mt-4 display-4' onClick={handleClickBack} /> */}

      <h2 className='display-1 text-danger fw-bold mb-5'>Pedido ya</h2>
      <p className='text-start fw-bold fs-3'>Por favor inicia sesion con tu email.</p>
      <p>Ut nisi ad commodo veniam mollit ullamco. In Lorem cillum anim cillum et aliqua. Dolore anim cillum id veniam elit esse excepteur.</p>

      <SingInButton 
        icon={<RiAdminFill className='fs-1 text-white' />} 
        bgColor='bg-success'
        text='iniciar sesion como admin' 
        handleClick={logUserAdmin}
      />
        
      <p className='position-absolute bottom-0 w-75 text-center'>Nostrud adipisicing labore laboris amet non sint laboris aute nulla cillum est voluptate.</p>
    </section>
  )
}

export default SignInLikeAdmin1
