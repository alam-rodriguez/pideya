import React, {useContext, useEffect, useState} from 'react';

// Componente
import Header from '../components/Header'

// Context
import { AppContext } from '../../../context/AppContext';

// Firebase
import { addReferidoPor, editEstadistica, getEstadisticas, getInfoUser, obtenerInfoApp, searchCodeRef } from '../../../firebase/firebaseFirestore';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

const SearchCodeRef = () => {

  const navigate = useNavigate();

  const { color1, email } = useContext(AppContext);

  const [infoReferido, setInfoReferido] = useState(null);

  const [infoPointsApp, setInfoPointsApp] = useState(null);

  useEffect( () => {
    if(email == null) navigate('/home');
    const f = async () => {

      const infoApp = await obtenerInfoApp();
      console.log(infoApp.infoPoints);
      setInfoPointsApp(infoApp.infoPoints);

      const res = await getInfoUser(email);
      if(res.referidoPor != undefined) {
        setInfoReferido( res.referidoPor );
      }
    }
    f();
  }, [] );

  const [inputValue, setInputValue] = useState('');

  const handleChangeInputValue = (e) => setInputValue(e.target.value); 

  const handleClick = async () => {
    const res = await searchCodeRef( Number(inputValue) );
    if(res.email != undefined){
      const referidoInfo = {
        codeRef: res.codeRef,
        email: res.email,
        nombre: res.nombre,
        givePointsForSpendMoney: false,
      }
      setInfoReferido( res );
      console.log( res );
      setInfoReferido(res);
      const resRef = await addReferidoPor(email, referidoInfo);

      const estadisticasAmigo = await getEstadisticas(res.email);
      const newEstadistcas = {
        dineroGastado: estadisticasAmigo.dineroGastado, 
        puntosGanados: estadisticasAmigo.puntosGanados + Number(infoPointsApp.refFriendGenerate),
        puntosGastados: estadisticasAmigo.puntosGastados,
        puntosRestantes: estadisticasAmigo.puntosRestantes + Number(infoPointsApp.refFriendGenerate),
      }
      const res3 = await editEstadistica(res.email, newEstadistcas);
      console.log(res3);



    }else {
      alert('no se ha escontrado este codigo');
    }
  }

  return (
    <div>
      <Header title='Entra el codigo de promo' />

      <section className='mx-4 d-flex flex-column justify-content-evenly' style={{height:'90vh'}}>
        <div>
          <p className='m-0 fs-4 text-center fw-normal'>Si fuiste invita por un amigo introduce su codigo de promocion aqui</p>
          { (infoReferido != null) ? 
            <>
              <input className='form-control border-0 border-bottom text-center fs-2 fw-bold'  type="text" value={infoReferido.codeRef} readOnly />  
                <div className='d-flex justify-content-between mt-5'>
                  <p className='m-0 fs-3 fw-medium'>Nombre:</p>
                  <p className='m-0 fs-3 fw-bold'>{infoReferido.nombre}</p>
                </div>
                <div className='d-flex justify-content-between mt-5'>
                  <p className='m-0 fs-3 fw-medium'>Nombre:</p>
                  <p className='m-0 fs-3 fw-bold'>{infoReferido.email}</p>
                </div>
            </>
            : <input className='form-control border-0 border-bottom text-center fs-2 fw-bold'  type="text" onChange={handleChangeInputValue} />
          }
        </div>
        { (infoReferido != null)
          ? <button className={`btn ${color1.btn} text-center form-control fs-4 p-3`} value={inputValue} onClick={handleClick} disabled>Continuar</button>
          : <button className={`btn ${color1.btn} text-center form-control fs-4 p-3`} value={inputValue} onClick={handleClick}>Continuar</button>
        }
      </section>
      
    </div>
  )
}

export default SearchCodeRef
