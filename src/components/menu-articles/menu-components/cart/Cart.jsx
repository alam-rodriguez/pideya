import React, { useContext, useEffect, useState } from 'react';

// uuid
import { v4 as uuid4v4 } from 'uuid';

// Firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { registrarUsuario } from '../../../../firebase/firebaseAuthGoogle';
import { crearPedidoUser, getInfoUser, saveCodeRef, saveInfoUser } from '../../../../firebase/firebaseFirestore';

// Components
import CartHeader from './CartHeader';
import CartArticlesView from './CartArticlesView';

// Context
import { AppContext } from '../../../../context/AppContext';

// components
import CartInfoDeal from './CartInfoDeal';
import CartInfoClient from './CartInfoClient';
import CartTotal from './CartTotal';

const Cart = ({setViewCart, setViewMenu}) => {

  const { color1, cart, email, setEmail, categorySelected } = useContext(AppContext);

  useEffect( () => { 
    console.log(categorySelected.nombre);
    if(email == null){
      const auth = getAuth();
      onAuthStateChanged(auth, (user)  => {
        if(user != null) setEmail(user.email);
        // console.log(user);
      });
    }
  }, [] );

  useEffect( () => {
    const f = async () => {
      const res = await getInfoUser(email);
      if(res != false) {
        setNombre(res.nombre);
        setDireccion(res.direccion);
        setTelefono(res.telefono);
        setCodeRef(res.codeRef);
      }else {
        // Crear codigo para referir amigos
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
        generateCodeRef(10);
      }
      console.log(res);
    }
    f();
  }, [] );

  // Info pedido
  const [horaQuierePedido, setHoraQuierePedido] = useState(null);
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [precioTotal, setPrecioTotal] = useState(0);

  // Info cliente
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [codeRef, setCodeRef] = useState(0);
  const [entrega, setEntrega] = useState('');
  const [lugarDelivery, setLugarDelivery] = useState({lugar: 'guerra', costo: 0});
  const [comentario, setComentario] = useState('');

  const handleClickOrdenar = async () => {
    if( nombre.length < 2 ) alert('El nombre debe de tener po lo menos 3 caracteres');
    else if( telefono.length < 9 ) alert('El telefono debe de ser un telefono valido');
    else if( entrega == '' ) alert('Debes de invitar si vas a pasar a recoger el pedido o si quieres un delivery');
    else {
      let userEmail = email;
      if( email == null) {
        const res = await registrarUsuario();
        userEmail = res;
      }
      const fecha = new Date();
      const hora = fecha.getHours() + ':' + fecha.getMinutes();
      const dia = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`; 
      
      const pedidoId = uuid4v4();
      const pedido = {
        horaQuierePedido: horaQuierePedido == null ? 'ahora mismo' : horaQuierePedido,
        metodoPago: metodoPago,
        nombre,
        direccion,
        telefono,
        comentario,
        pedido: cart,
        codeRef: codeRef,
        // precio: cart.precio,
        // categoriaNombre: categorySelected.nombre,
        hora: hora,
        dia: dia,
        email: userEmail,
        isDelivery: entrega == 'quiero delivery' ? true : false,
        deliveryInfo: lugarDelivery,
        pedidoId: pedidoId,
        wasView: false,
        isReady: false,
        wasReceived: false,
        // precioTotal: ,
      }
      const res = await saveInfoUser(pedido);
      const resCode = await saveCodeRef(email, nombre, codeRef);
      
      if( res == true){
        const res2 = await crearPedidoUser(pedido);
        if( res2 ) {
          alert('Pedido hecho exitosamente');
        }else{
          alert('Error al hacer pedido');
        }
        
      }else {
        alert('Ha ocurrido un error, vuela a intentarlo');
      }
    }
    
  }

  const handleClickAddMoreArticles = () => {
    setViewCart(false);
    setViewMenu(0);
  }

  return (
    <div className='position-absolute top-0 start-0 bg-white z-1'>

      {/* Header del cart */}
      <CartHeader setViewCart={setViewCart} />

      <section className=' w-100 vh-100 overflow-y-scroll px-4 pt-5' style={{paddingBottom:70}}>

        {/* Info Deal */}
        <CartInfoDeal setMetodoPago={setMetodoPago} setHoraQuierePedido={setHoraQuierePedido} />

        {/* Articles view */}
        <CartArticlesView handleClickAddMoreArticles={handleClickAddMoreArticles} />

        {/* Btn para ir a menu */}
        <button className={`btn ${color1.btnOutline} form-control fs-3 p-3 my-5`} onClick={handleClickAddMoreArticles}>Agregar mas Articulo</button>

        {/* Info Client */}
        <CartInfoClient nombre={nombre} setNombre={setNombre} direccion={direccion} setDireccion={setDireccion} telefono={telefono} setTelefono={setTelefono} setEntrega={setEntrega} entrega={entrega} setLugarDelivery={setLugarDelivery} setComentario={setComentario} />

        {/* Totales */}
        <CartTotal isDelivery={entrega} precioDelivey={lugarDelivery.costo} lugarDelivery={lugarDelivery} setPrecioTotal={setPrecioTotal} />

      </section>

      {/* Btn para ordenar */}
      <div className='p-4 bg-white position-absolute bottom-0 w-100'>
        <button className={`p-3 fs-3 btn ${color1.btn} form-control`} onClick={handleClickOrdenar}>Ordenar</button>
      </div>

    </div>
  );
}

export default Cart;
