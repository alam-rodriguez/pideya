import React, { useContext, useEffect, useState } from 'react';

// Firebase
import { getordersNotView } from '../../firebase/firebaseFirestore';

// Components
import Header from './see-orders-clients-components/Header';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Context
import { AppContext } from '../../context/AppContext';

const SeeOrders = () => {

  const navigate = useNavigate();

  const { SeletedOrder, setSeletedOrder } = useContext(AppContext);

  const [orders, setOrders] = useState(null);

  useEffect( () => {
    const f = async () => {
      const res = await getordersNotView();
      console.log(res)
      setOrders(res);
    }
    f();
  }, [] );

  const handleClickOrder = (orden) => {
    setSeletedOrder(orden);
    navigate('/see-order');
  }

  return (
    <main>
      <Header />

      <section>

        { 
          (orders != null )
            ? orders.map((orden)=>{
              let total = 0;
              orden.pedido.map( (item) => {
                total += Number(item.precioVariosArticles);
              });
              total += Number(orden.deliveryInfo.costo);

              let puntos = 0;
              orden.pedidoOfPoints.map( (item) => {
                puntos += Number(item.PuntosVariosArticles);
              });
              return(
                <div key={orden.id} className='border m-4 shadow-lg rounded-5 border border-success' onClick={ () => handleClickOrder(orden) }>

                  <p className='m-0 fw-bold fs-3 text-center py-2 border-bottom border-success'>{orden.user}</p>
                  <div className='p-3'>

                    <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                      <p className='m-0 fw-bold fs-5 w-25'>Pedido id:</p>
                      <p className='m-0 fw-medium fs-5 w-75 text-end'>{orden.id}</p>
                    </div>

                    <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                      <p className='m-0 fw-bold fs-5 w-25'>Fecha:</p>
                      <p className='m-0 fw-medium fs-5 w-75 text-end'>{orden.dia}, {orden.hora}</p>
                    </div>

                    { orden.pedidoOfPoints.length > 0 ?  
                      <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                        <p className='m-0 fw-bold fs-5 w-25'>Puntos:</p>
                        <p className='m-0 fw-medium fs-5 w-75 text-end'>{puntos}</p>
                      </div>
                      : <></>
                    }

                    { orden.isDelivery ?  
                      <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                        <p className='m-0 fw-bold fs-5 w-25'>Delivery:</p>
                        <p className='m-0 fw-medium fs-5 w-75 text-end'>{orden.deliveryInfo.lugar}</p>
                      </div>
                      : <></>
                    }

                    

                  </div>

                  <div className='d-flex justify-content-between border-top border-success p-3'>
                    <p className='m-0 fw-bold fs-5 w-25'>Total:</p>
                    <p className='m-0 fw-bold fs-5 w-75 text-end'>{total}</p>
                  </div>

                </div>
              );
            })
          : <></>
        }

      </section>
    </main>
  )
}

export default SeeOrders
