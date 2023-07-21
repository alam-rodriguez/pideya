import React, { useContext, useEffect, useState } from 'react';

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
import { registrarAdmin, registrarSemiAdmin } from '../../../../firebase/firebaseAuthGoogle';
import { existAdmin, guardarSemisAdmins, obtenerInfoApp, obtenerSemiAdmids } from '../../../../firebase/firebaseFirestore';
// import { existAdmin, registrarAdmin, registrarUsuario } from '../../../../firebase/firebase';

// Contetx
import { AppContext } from '../../../../context/AppContext';
import { ToastContainer, toast } from 'react-toastify';

const SignInLikeSemiAdmin = () => {

  // const [canStayHere, setCanStayHere] = useState(false);

  // const [first, setfirst] = useState(second)
  
  const navigate = useNavigate();

  const { isAdmin } = useContext(AppContext); 

  const handleClickBack = () => navigate('/home');

  const [viewInfo, setViewInfo] = useState(false);
  useEffect( () => {
    const password = prompt('Contraseña');
    if(password != '123456789'){
      navigate('/home');
    }else {
      setViewInfo(true);
    }
  }, [] );

  const logUserAdmin = async () => {

    const createSemiAdminPromise = new Promise( async (resolve, reject) => {

      const semiAdmins = await obtenerInfoApp();

      let admin = true;
      let saveAdminBD = true;
  
      if(semiAdmins.semisAdmins == undefined){
        admin = await registrarSemiAdmin();
        const admins = [ admin ];
        saveAdminBD = await guardarSemisAdmins( admins );
        // if(saveAdminBD) navigate('/home');
        // else console.log('ha ocurrido un error');
      } else if(semiAdmins.semisAdmins.length <= 5){
        let createAdmin = true;
        admin = await registrarSemiAdmin();
        semiAdmins.semisAdmins.forEach( adminApp => {
          if(adminApp == admin){
            createAdmin = false;
            return;
          }
        });
        if(createAdmin){
          console.log([...semiAdmins.semisAdmins, admin]);
          const admins = [...semiAdmins.semisAdmins, admin];
          saveAdminBD = await guardarSemisAdmins( admins );
        }else {
          alert('Ya esta cuenta esta registrada como semi admin');
        }
        // if(saveAdminBD) navigate('/home');
        // else console.log('ha ocurrido un error');

      }else if(semiAdmins.semisAdmins.length > 5){
        alert('no se pueden registrar como semi admin, hay demacidos admin');
      }

      if(semiAdmins != false && admin != false && saveAdminBD == true){
        resolve();
        setTimeout(() => {
          navigate('/home');
        }, 5000);
      }else {
        reject();
        alert('ha ocurrido un error');
      }

    });

    toast.promise( createSemiAdminPromise, {
      pending: 'Promise is pending',
      success: 'Promise resolved 👌',
      error: 'Promise rejected 🤯'
    });

    

    // const res = await existAdmin();
    // if( res == false){
    //   navigate('/registro-like-admin/details-app');
    // }else {
    //   console.log('Lo siento pero no se puede cambiar el admin de la app una vez creado, para mas informacion comuniquese con el desarrollador');
    // }
  }

  if(viewInfo){
    return (
      <section className='d-flex justify-content-center flex-column align-items-center col-9 m-auto mt-5 vh-100'>
        
        {/* <IoIosArrowBack className='position-absolute top-0 start-0 mt-4 display-4' onClick={handleClickBack} /> */}
  
        <h2 className='display-1 text-danger fw-bold mb-5'>Pedido ya</h2>
        <p className='text-start fw-bold fs-3'>Por favor inicia sesion con tu email.</p>
        <p>Ut nisi ad commodo veniam mollit ullamco. In Lorem cillum anim cillum et aliqua. Dolore anim cillum id veniam elit esse excepteur.</p>
  
        <SingInButton 
          icon={<RiAdminFill className='fs-1 text-white' />} 
          bgColor='bg-success'
          text='iniciar sesion admin 2' 
          handleClick={logUserAdmin}
        />
          
        <p className='position-absolute bottom-0 w-75 text-center'>Nostrud adipisicing labore laboris amet non sint laboris aute nulla cillum est voluptate.</p>
        <ToastContainer />
      </section>
    )
  }
}

export default SignInLikeSemiAdmin;
