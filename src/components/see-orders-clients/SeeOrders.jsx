import React, { useContext, useEffect, useState } from 'react';

// Firebase
import { getordersNotView, orderOfToday } from '../../firebase/firebaseFirestore';

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

  const [dateToSearch, setDateToSearch] = useState('');

  useEffect( () => {
    const day = new Date();
    const hoy = `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`;
    setDateToSearch(hoy);
  }, [] );

  const [viewSaved, setviewSaved] = useState(false);

  useEffect( () => {
    const f = async () => {
      const orders = await orderOfToday(dateToSearch);
      console.log(dateToSearch);
      const res = [];
      if(orders != null && orders != 'no-hay-pedidos' && !viewSaved){
        orders.forEach( (order) => {
          if(!order.guardar){
            res.push(order);
            console.log(order);
          }
        });
        setOrders(res);
      }else {
        setOrders(orders);
      }
      
    }
    f();
  }, [dateToSearch, viewSaved] );

  const handleClickOrder = (orden) => {
    setSeletedOrder(orden);
    navigate('/see-order');
  }

  const handleClickChangeDate = (e) => {
    const fechaPartes = e.target.value.split('-');
    const dia = Number(fechaPartes[2]);
    const mes = Number(fechaPartes[1]);
    const anio = Number(fechaPartes[0]);
    const hoy = `${dia}/${mes}/${anio}`;
    // console.log(hoy);
    setDateToSearch(hoy);
  }

  const handleChangeSeeGuardados = (e) => {
    setviewSaved(e.target.checked);
    console.log(e.target.checked);
  }

  return (
    <main>
      <Header />

      <section>

        <div className='row'>
          <input className='col-6' type="date" onChange={handleClickChangeDate} />

          <div className="form-check form-switch col-6">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={handleChangeSeeGuardados} />
            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Ver todos los pedidos</label>
          </div>
        </div>

        { 
          (orders != null )
            ? orders != 'no-hay-pedidos' ?  
              orders.map((orden)=>{
                let total = 0;
                orden.pedido.map( (item) => {
                  total += Number(item.precioVariosArticles);
                });
                if(orden.deliveryInfo != null) total += Number(orden.deliveryInfo.costo);

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
            : <p>No hay pedidos</p> 
          : <></>
        }

      </section>
    </main>
  )
}

export default SeeOrders









// console.log(res);
      // const res = await getordersNotView();
      // console.log(res)