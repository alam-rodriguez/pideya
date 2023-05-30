import React, { useContext, useEffect, useState } from 'react';

// React Icons
import { MdShoppingCart } from 'react-icons/md';

// Context
import { AppContext } from '../../../../context/AppContext';

const CartPreview = ({setViewCart}) => {

  const { color1, cart } = useContext(AppContext);

  const [total, setTotal] = useState(0);

  useEffect( () => {
    let PedidoPrecios = 0;
    cart.map( (pedido) => {
      PedidoPrecios += Number(pedido.precioVariosArticles); 
    });
    setTotal(PedidoPrecios);
  }, [cart] );

  const handleClick = () => setViewCart(true);

  return (
    <div className={`d-flex p-3 justify-content-between position-fixed bottom-0 start-0 w-100 rounded-4 rounded-bottom-0 ${color1.bgColor}`} style={{height:65}} onClick={handleClick}>
      <div className='d-flex gap-3'>
        <MdShoppingCart className='display-6 text-white' />
        <p className='position-relative fs-4 text-white' style={{bottom:3}}>{cart.length}</p>
      </div>
      <p className='m-0 fs-4 text-white'>{total} RD$</p>
    </div>
  )
}

export default CartPreview
