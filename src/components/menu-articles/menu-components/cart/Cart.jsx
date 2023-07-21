import React, { useContext, useEffect, useState } from 'react';

// uuid
import { v4 as uuid4v4 } from 'uuid';

// Firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { registrarUsuario, registrarUsuarioAgain } from '../../../../firebase/firebaseAuthGoogle';
import { crearPedidoUser, createEstadisticas, editEstadistica, getEachStatitics, getEstadisticas, getInfoUser, givePointForRefFriend, givePointForRefGoodFriend, obtenerInfoApp, saveCodeRef, saveEstadistica, saveInfoUser, updateInfoUser } from '../../../../firebase/firebaseFirestore';

// Components
import CartHeader from './CartHeader';
import CartArticlesView from './CartArticlesView';

// Context
import { AppContext } from '../../../../context/AppContext';

// Toaster
import { ToastContainer, toast } from 'react-toastify';

// Swal-Alerts
import Swal from 'sweetalert2';

// components
import CartInfoDeal from './CartInfoDeal';
import CartInfoClient from './CartInfoClient';
import CartTotal from './CartTotal';
import { useNavigate } from 'react-router-dom';


const Cart = ({setViewCart, setViewMenu, resetCart}) => {

  const navigate = useNavigate();

  const { color1, cart, setCart, email, setEmail, categorySelected, cartOfCategoryPoints, setCartOfCategoryPoints, amountPoints, setAmountPoints, infoPoints, setInfoPoints, estadisticasUser, setEstadisticasUser } = useContext(AppContext);

  const [total, setTotal] = useState(0);
  const [puntos, setPuntos] = useState(0);

  const [existUser, setExistUser] = useState(false);

  // // Para saber el estado del usuario
  // const [stateUserInfo, setStateUserInfo] = useState(null)
  // useEffect( () => {
  //   if(stateUserInfo == null){
  //     const f = async () => {
  //       const estadisticas = await getEstadisticas(email);
  //       if(estadisticas == 'no estadisticas') setStateUserInfo('no-estadisticas');
  //       else setStateUserInfo('si-estadisticas');
  //       console.log(estadisticas);
  //     }
  //     f();
  //   }
  // }, [stateUserInfo] );

  // Para saber el estado del usuario
  const [stateUserInfo, setStateUserInfo] = useState(null);

  useEffect( () => {
    if(stateUserInfo == null){
      const f = async () => {
        const infoUser = await getInfoUser(email);
        if(infoUser == 'no-exist') setStateUserInfo('no-exist');
        else {
          setStateUserInfo('si-exist');
          // if(infoUser.referidoPor != undefined){
          //   setInfoWhoReferUser(infoUser.referidoPor);
          // }
        }
        console.log(infoUser);
      }
      f();
    }
  }, [stateUserInfo] );

  // useEffect( () => { 
  //   console.log(categorySelected.nombre);
  //   if(email == null){
  //     const auth = getAuth();
  //     onAuthStateChanged(auth, (user)  => {
  //       if(user != null) setEmail(user.email);
  //       // console.log(user);
  //     });
  //   }
  // }, [] );

  // useEffect( () => {
  //   const f = async () => {
  //     if(infoPoints == null){
  //       const infoPointsApp = await obtenerInfoApp();
  //       console.log(infoPointsApp.infoPoints);
  //       setInfoPoints(infoPointsApp.infoPoints);
  //     }
  //     ///////

  //     // const res = await editEstadistica(seletedOrder.email, newStatistics);
  //     // if(res){
  //     //   console.log('Estadisticas actualizadas')
  //     // }

  //     //////
  //   }
  //   f();
  // }, [] );

  const getFecha = (type) => {
    const fecha = new Date();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const am_pm = hora > 12 ? 'PM' : 'AM';
    if(type == 'hora') return hora;
    if(type == 'minuto') return minutos;
    if(type == 'segundo') return minutos;
    return `${dia}/${mes}/${anio}, ${hora}:${minutos} ${am_pm}`;
  }

  useEffect( () => {
    console.log(infoPoints);
    const f = async () => {
      const res = await getInfoUser(email);
      if(res != 'no-exist' && res != false) {
          
        setExistUser(true);
        setNombre(res.nombre);
        setDireccion(res.direccion);
        setTelefono(res.telefono);
        setCodeRef(res.codeRef);
          
        // Crear Id del pedido
        // const generateIdPedido = (i) => {
        //   const idPedido = Math.floor(Math.random() * 100000);
        //   if(i == 0){
        //     setPedidoId(idPedido);
        //     return;
        //   }
        //   if(idPedido.toString().length == 5){  
        //     console.log(idPedido);
        //     setPedidoId(idPedido);
        //     return;
        //   } else {
        //     generateIdPedido(i - 1);
        //   }
        // }
        // generateIdPedido(10);
        generateIdPedido(10);
      }else {
        // Crear codigo para referir amigos
        // const generateCodeRef = (i) => {
        //   const codeRef = Math.floor(Math.random() * 100000);
        //   if(i == 0){
        //     setCodeRef(codeRef);
        //     return;
        //   }
        //   if(codeRef.toString().length == 5){  
        //     console.log(codeRef);
        //     setCodeRef(codeRef);
        //     return;
        //   } else {
        //     generateCodeRef(i - 1);
        //   }
        // }
        // generateCodeRef(10);
      }
      console.log(res);

      const resInfoApp = await obtenerInfoApp();
      console.log(resInfoApp.infoPoints);
      setPointsInfo(resInfoApp.infoPoints);

    }
    f();
  }, [email] );

  // Crear Id del pedido
  const generateIdPedido = (i) => {
    const idPedido = Math.floor(Math.random() * 100000);
    if(i == 0){
      setPedidoId(idPedido);
      return;
    }
    if(idPedido.toString().length == 5){  
      console.log(idPedido);
      setPedidoId(idPedido);
      return;
    } else {
      generateIdPedido(i - 1);
    }
  }

  const generateCodeRef = (i) => {
    const codeRef = Math.floor(Math.random() * 100000);
    if(i == 0){
      setCodeRef(codeRef);
      return;
    }
    if(codeRef.toString().length == 5){  
      console.log(codeRef);
      setCodeRef(codeRef);
      return;
    } else {
      generateCodeRef(i - 1);
    }
  } 

  // Info pedido
  const [horaQuierePedido, setHoraQuierePedido] = useState(null);
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [precioTotal, setPrecioTotal] = useState(0);

  const [pointsInfo, setPointsInfo] = useState(null);

  // Info cliente
  const [pedidoId, setPedidoId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [codeRef, setCodeRef] = useState(0);
  const [entrega, setEntrega] = useState('');
  const [lugarDelivery, setLugarDelivery] = useState({lugar: 'guerra', costo: 50});
  const [comentario, setComentario] = useState('');
  // const [infoWhoReferUser, setInfoWhoReferUser] = useState(null);

  // const notificacion = (text) => {
  //   return toast.info( text, {
  //     position: "bottom-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: 'light',
  //   });
  // }

  const notificacion = (text) => Swal.fire({
    title: 'Advertencia',
    text: text, 
  });

  const handleClickOrdenar = async () => {

    if( nombre.length < 3) {
      notificacion('El nombre debe de tener por lo menos 3 caracteres');
      return;
    }
    if( telefono.length < 9) {
      notificacion('El telefono debe de ser un telefono valido');
      return;
    }
    if( entrega == '' ) {
      notificacion('Debes de indicar si vas a pasar a recoger el pedido o si quieres un delivery');
      return;
    }
    if(puntos == 0 && (total - Number(lugarDelivery.costo)) < 150) {
      notificacion('Para poder hacer un pedido debes de gastar por lo menos 150 pesos');
      return;
    }
    if(amountPoints < puntos) {
      notificacion('No puedes hacer este perdido porque no tienes sufientes puntos');
      return;
    }
    const resSwal = await Swal.fire({
      title: 'Estas seguro?',
      text: "Quieres realmente hacer este pedido ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ordenar'
    });
    if(!resSwal.isConfirmed) return;

    // let userEmail = email;
    // if( email == null) userEmail = await registrarUsuario();
        
    const fecha = getFecha();
    const hora = getFecha('hora');
    const minuto = getFecha('minuto');
    const segundo = getFecha('segundo');
    
    const pedido = {
      horaQuierePedido: horaQuierePedido == null ? 'ahora mismo' : horaQuierePedido,
      metodoPago: metodoPago,
      nombre,
      direccion,
      telefono,
      comentario,
      pedido: cart,
      pedidoOfPoints: cartOfCategoryPoints,
      codeRef: codeRef,
      // precio: cart.precio,
      // categoriaNombre: categorySelected.nombre,
      horaPedido: {
        hora: hora,
        minuto: minuto,
        segundo: segundo,
      },
      dia: fecha,
      email: email,
      isDelivery: entrega == 'quiero delivery' ? true : false,
      deliveryInfo: entrega == 'quiero delivery' ? lugarDelivery : null,
      pedidoId: pedidoId,
      wasView: false,
      isReady: false,
      paid: true/*false*/,
      guardar: false,
      pointsInfo: pointsInfo != null ? pointsInfo : 'no genera puntos',
      recibioPuntos: true/*false*/,
      total: total,
      puntosGastados: puntos,
    }

    // console.log();

    const visita = {
      id: pedidoId,
      fecha: fecha,
      gastado: total,
      puntosGastados: puntos,
      puntosGenerados: infoPoints != undefined ? infoPoints.activatePoints ? total / infoPoints.eachPointValue : 0 : 0,
    }
    const guardarEstadisca = await saveEstadistica(email, visita);
    if(guardarEstadisca){
      console.log('Estadistica guardada');
    }

    // if(estadisticasUser != null);
    const estadisticas = await getEstadisticas(email);
    if(estadisticas == 'no estadisticas'){
      const firstEstadisticas = {
        email: pedido.email,
        nombre: pedido.nombre,
        dineroGastado: total,
        puntosGanados: infoPoints != undefined ? infoPoints.activatePoints ? total / infoPoints.eachPointValue : 0 : 0,
        puntosGastados: puntos,
        pointsForInviteFriend: 0,
        // puntosRestantes: infoPoints.activatePoints ? total / infoPoints.eachPointValue : 0,
      }
      const res = await createEstadisticas(email, firstEstadisticas);
    }else {
      const newStatistics = {
        nombre: pedido.nombre,
        dineroGastado: estadisticas.dineroGastado + total,
        puntosGanados: estadisticas.puntosGanados + (total / infoPoints.eachPointValue),
        puntosGastados: estadisticas.puntosGastados + puntos,
        pointsForInviteFriend: estadisticas.pointsForInviteFriend,
      }
      console.log( newStatistics );

      const resEstadisticas = await editEstadistica(email, newStatistics);
      if(resEstadisticas){
        console.log('Estadisticas actualizadas')
      }

    }
    

        
      console.log(pedido)
      let res = true;
      // TODO: si existe la info del user, en la funcion de ff usar updateDoc y no setDoc
      if(stateUserInfo == 'no-exist') res = await saveInfoUser(pedido);
      else updateInfoUser(pedido);
      const resCode = await saveCodeRef(email, nombre, codeRef);
        
      if( res == true){
        let res2 = false
  
        const crearOrderPromise = new Promise( async (resolve, reject) => {          
          const res = await crearPedidoUser(pedido);
          // console.log(pointsInfo);
          givePointsToFriendWhoInviteMe(pedido.email);
          if(res) {
            resolve('bien');
            setTimeout(() => {
              setCart(null);
              setCartOfCategoryPoints(null);
              navigate('/home');
              resetCart();
            }, 5000);
            setAmountPoints(amountPoints - puntos); 
          }
          else reject('mal');

        });
          
        toast.promise( crearOrderPromise, {
          pending: 'Realizando Pedido',
          success: 'Pedido creado con exito',
          error: 'Ah ocurrido un errror, vuelva a intentarlo'
        });
      
      }else {
        notificacion('Ha ocurrido un error, vuela a intentarlo');
      }
  
  }

  const givePointsToFriendWhoInviteMe = async () => {
    
    const infoUser = await getInfoUser(email);
    const referidoInfo = infoUser.referidoPor;
    if(referidoInfo != undefined){

      console.log(referidoInfo);

      // console.log(pointsInfo);
      
      if(!referidoInfo.givePointsForInviteFriend){
        const estadisticas = await getEstadisticas(email);
        const estadisticasAmigo = await getEstadisticas(referidoInfo.email);
        console.log(estadisticas.dineroGastado > 500);
        if(estadisticas.dineroGastado > 500){
          console.log('-----------------------------');
          const newStatistics = {
            nombre: estadisticasAmigo.nombre,
            dineroGastado: estadisticasAmigo.dineroGastado,
            puntosGanados: estadisticasAmigo.puntosGanados,
            pointsForInviteFriend: estadisticasAmigo.pointsForInviteFriend + pointsInfo.refFriendGenerate, 
            puntosGastados: estadisticasAmigo.puntosGastados,
          }
          const resEstadisticas = await editEstadistica(referidoInfo.email, newStatistics);
          const info = {
            codeRef: referidoInfo.codeRef,
            email: referidoInfo.email,
            givePointsForInviteFriend: true,
            givePointsForSpendMoney: referidoInfo.givePointsForSpendMoney,
            nombre: referidoInfo.nombre,
          }
          const res = await givePointForRefFriend(email, info);
          // TODO: editar info de user
        }
      }
      if(!referidoInfo.givePointsForSpendMoney){
        const estadisticas = await getEstadisticas(email);
        const estadisticasAmigo = await getEstadisticas(referidoInfo.email);
        if(estadisticas.dineroGastado > pointsInfo.minForSpend){
          const newStatistics = {
            nombre: estadisticasAmigo.nombre,
            dineroGastado: estadisticasAmigo.dineroGastado,
            puntosGanados: estadisticasAmigo.puntosGanados,
            pointsForInviteFriend: estadisticasAmigo.pointsForInviteFriend + pointsInfo.pointsForMinSpend, 
            puntosGastados: estadisticasAmigo.puntosGastados,
          }
          const resEstadisticas = await editEstadistica(referidoInfo.email, newStatistics);
          const info = {
            codeRef: referidoInfo.codeRef,
            email: referidoInfo.email,
            givePointsForInviteFriend: referidoInfo.givePointsForInviteFriend,
            givePointsForSpendMoney: true,
            nombre: referidoInfo.nombre,
          }
          const res = await givePointForRefGoodFriend(email, info);
          // TODO: editar info de user
        }
      }
    }

  }

  const handleClickRegistrarse = async () => {

    const userEmail = await registrarUsuarioAgain();
    if(userEmail != false) {

      setExistUser(true);
      setEmail(userEmail);

      const res = await getInfoUser(userEmail);
      console.log(res);

      generateIdPedido(10);

      if(res == 'no-exist'){
        generateCodeRef(10);
      }
      // if(res != false || res != 'no-exist') {
      //   // setNombre(res.nombre);
      //   // setDireccion(res.direccion);
      //   // setTelefono(res.telefono);
      //   // setCodeRef(res.codeRef);
      // }
    }
    else alert('error');
  }

  const handleClickBack = () => {
    setClose(true);
    setTimeout(() => {
      setViewCart(false);
      setViewMenu(0);
    }, 1000);
  }

  const [close, setClose] = useState(false);

  return (
    <div className={`animate__animated ${!close ? 'animate__slideInUp' : 'animate__slideOutDown'} position-absolute top-0 start-0 bg-white z-1`}>

      {/* Header del cart */}
      <CartHeader handleClickBack={handleClickBack} />

      <section className='w-100 vh-100 overflow-y-scroll px-4 pt-5' style={{paddingBottom:70}}>

        {/* Info Deal */}
        <CartInfoDeal setMetodoPago={setMetodoPago} setHoraQuierePedido={setHoraQuierePedido} />

        {/* Articles view */}
        <CartArticlesView handleClickBack={handleClickBack} />

        {/* Btn para ir a menu */}
        <button className={`btn ${color1.btnOutline} form-control fs-5 p-2 my-5`} onClick={handleClickBack}>Agregar mas Articulo</button>

        {/* Info Client */}
        <CartInfoClient nombre={nombre} setNombre={setNombre} direccion={direccion} setDireccion={setDireccion} telefono={telefono} setTelefono={setTelefono} setEntrega={setEntrega} entrega={entrega} setLugarDelivery={setLugarDelivery} setComentario={setComentario} />

        {/* Totales */}
        <CartTotal isDelivery={entrega} precioDelivey={lugarDelivery.costo} lugarDelivery={lugarDelivery} setPrecioTotal={setPrecioTotal} total={total} setTotal={setTotal} puntos={puntos} setPuntos={setPuntos} />

      </section>

      {/* Btn para ordenar */}
      <div className='p-4 bg-white position-absolute bottom-0 w-100'>
        { existUser 
          ? <button className={`p-2 fs-5 rounded-3 btn ${color1.btn} form-control`} onClick={handleClickOrdenar}>Ordenar</button>
          : <button className={`p-2 fs-5 rounded-3 btn ${color1.btn} form-control`} onClick={handleClickRegistrarse}>Registrarse</button>
        }
      </div>
      <ToastContainer />
    </div>
  );
}

export default Cart;
