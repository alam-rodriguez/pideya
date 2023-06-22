import React, { useContext, useEffect, useState } from 'react'

// Context
import { AppContext } from '../../../../context/AppContext';

const CartTotal = ({isDelivery,precioDelivey, lugarDelivery, setPrecioTotal, total, setTotal}) => {

  const { cart, setCart, cartOfCategoryPoints } = useContext(AppContext);

  // const [total, setTotal] = useState(0);

  const [puntos, setPuntos] = useState(0);

  useEffect( () => {
    let total = 0;
    cart.map( (article) => {
      total += Number(article.precioVariosArticles);
    });
    if(isDelivery == 'quiero delivery') total += Number(precioDelivey);
    setPrecioTotal(total);
    setTotal(total);
    let puntos = 0;
    cartOfCategoryPoints.map((article)=>{
      puntos += article.PuntosVariosArticles;
    });
    setPuntos(puntos);
    // setCart(state => ({...state, total: total}));
  }, [cart, lugarDelivery, isDelivery, cartOfCategoryPoints] );

  return (
    <div className='my-5'>

      <div className='d-flex justify-content-between my-3'>
        <p className='m-0 fs-3 fw-bold'>Subtotal</p>
        <p className='m-0 fs-3'>RD$ {total}</p>
      </div>

      { puntos > 0 ? 
        <div className='d-flex justify-content-between my-3'>
          <p className='m-0 fs-3 fw-bold'>Total de puntos</p>
          <p className='m-0 fs-3'>{puntos} Puntos</p>
        </div>
      : <div className='d-flex justify-content-between my-3'>
          <p className='m-0 fs-3 fw-bold'>tarifa de servicio</p>
          <p className='m-0 fs-3'>RD$ 00.00</p>
        </div>
      }

      

      <div className='d-flex justify-content-between my-3'>
        <p className='m-0 fs-3 fw-bold'>Total</p>
        <p className='m-0 fs-3'>RD$ {total}</p>
      </div>

    </div>
  );
}

export default CartTotal
