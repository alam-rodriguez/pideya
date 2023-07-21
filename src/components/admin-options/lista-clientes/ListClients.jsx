import React, {useEffect, useState} from 'react';

// Header
import Header from './list-clients-components/Header';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Components
import ItemClientList from './ItemClientList';

// Firebase
import { getAllStatistics } from '../../../firebase/firebaseFirestore';


const ListClients = () => {

  const [listUsers, setListUsers] = useState([]);
  
  const [selectValue, setSelectValue] = useState('dinero-gastado');
  const handleChangeSelect = (e) => setSelectValue(e.target.value);
  

  // useEffect( () => {
  //   const f = async () => {
  //     // let users = [];
  //     // if(listUsers.length == 0){
  //       const users = await getAllStatistics();
  //       setListUsers(users);
  //     //   console.log(users);
  //     // }else {
  //     //   users = listUsers;
  //     // }
  //   }
  //   f();
  // }, [] );

  useEffect(()=>{
    const f = async () => {
      let users = [];

      if(listUsers.length == 0) users = await getAllStatistics();
      else users = listUsers;
      
      if(selectValue == 'dinero-gastado'){
        users.sort((a, b) => b.dineroGastado - a.dineroGastado);
        setListUsers(users);
      }else if(selectValue == 'puntos-ganados'){
        users.sort((a, b) => b.puntosGanados - a.puntosGanados);
        setListUsers(users);
      }else if(selectValue == 'puntos-por-invitar'){
        const newArray = users.sort((a, b) => b.pointsForInviteFriend - a.pointsForInviteFriend);
        setListUsers(newArray);
      }else if(selectValue == 'puntos-gastados'){
        users.sort((a, b) => b.puntosGastados - a.puntosGastados);
        setListUsers(users);
      }else if(selectValue == 'puntos-restantes'){
        users.sort((a, b) => b.puntosRestantes - a.puntosRestantes);
        setListUsers(users);
      }
      
    }
    f();
  }, [selectValue] );


  const navigate = useNavigate();

  const handleClickAtras = () => navigate('/admin-options');
  return (
    <main>
      <Header handleClickAtras={handleClickAtras}/>
      <section className='mx-3'>

        <div className='d-flex justify-content-between my-4'>
          <p className='m-0 w-50 fs-3 fw-medium'>Nombre</p>
          <select className="form-select w-50" aria-label="Default select example" onChange={handleChangeSelect}>
            <option value='dinero-gastado'>Dinero gastado</option>
            <option value="puntos-ganados">Puntos ganados</option>
            <option value="puntos-por-invitar">Puntos Por invitar amigos</option>
            <option value="puntos-gastados">Puntos gastados</option>
            <option value="puntos-restantes">Puntos restantes</option>
          </select>
        </div>

        { listUsers.map( (user) => (
          <ItemClientList nombre={user.nombre} valueProp={user} selectValue={selectValue} key={user.email}/>
        ))}

      </section>
    </main>
  )
}

export default ListClients
