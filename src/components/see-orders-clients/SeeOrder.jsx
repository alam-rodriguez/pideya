import React, { useContext, useEffect, useState } from 'react';

// Firebase
import { getordersNotView } from '../../firebase/firebaseFirestore';

// Components
import Header from './see-orders-clients-components/Header';

// Context
import { AppContext } from '../../context/AppContext';

// React-Rounter-Dom
import { useNavigate } from 'react-router-dom';

const SeeOrder = () => {

  const navigate = useNavigate()

  const { SeletedOrder, setSeletedOrder } = useContext(AppContext);

  const [total, setTotal] = useState(0);

  useEffect( () => {
    if(SeletedOrder == null) {
      navigate('/see-orders');
      return;
    }
    let total = 0;
    SeletedOrder.pedido.map( (item) => {
      total += Number(item.precioVariosArticles);
    });
    total += Number(SeletedOrder.deliveryInfo.costo);
    setTotal(total);
  }, [] );

  if(SeletedOrder != null){
    return (
      <main className=''>
        <Header link='/see-orders' title='Pedido' />
  
        <section className=''>
         
          <div key={SeletedOrder.id} className='border m-4 shadow-lg rounded-5 border border-success'>
  
            <p className='m-0 fw-bold fs-3 text-center py-2 border-bottom border-success'>{SeletedOrder.user}</p>
            <div className='p-3'>
  
              <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                <p className='m-0 fw-bold fs-5 w-25'>Pedido id:</p>
                <p className='m-0 fw-medium fs-5 w-75 text-end'>{SeletedOrder.id}</p>
              </div>
  
              <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                <p className='m-0 fw-bold fs-5 w-25'>Fecha:</p>
                <p className='m-0 fw-medium fs-5 w-75 text-end'>{SeletedOrder.dia}, {SeletedOrder.hora}</p>
              </div>
  
              <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                <p className='m-0 fw-bold fs-5 w-25'>Numero:</p>
                <p className='m-0 fw-medium fs-5 w-75 text-end'>{SeletedOrder.telefono}</p>
              </div>
  
              <div className='py-2'>
                <p className='m-0 fw-bold fs-4 text-center'>Articulos:</p>
                { 
                  SeletedOrder.pedido.map( (article, i) => (
                    <div key={i} className='border-bottom py-2'>
                      <p className='m-0 fw-medium fs-5 text-center text-secondary'>Categoria: <span className='fw-bold text-black fst-italic'>{article.categoria.nombre}</span></p>
                      <p className='m-0 fw-medium fs-5 text-center text-secondary'>Cantidad: <span className='fw-bold text-black fst-italic'>{article.cantidad}</span></p>
                      <p className='m-0 fw-medium fs-5 text-center text-secondary'>Articulo: <span className='fw-bold text-black fst-italic'>{(article.size != '') ? `${article.size}-${article.ingredientePrincipal}` : article.ingredientePrincipal}</span></p>
                        
                      { 
                        (article.ingredientesAdicionales.length > 0)
                        ? <p className='m-0 fw-medium fs-5 text-center text-secondary'>Adicional: {article.ingredientesAdicionales.map((adicional)=>(
                            <span className='fw-bold text-black fst-italic'>{adicional.adicional},</span>
                          ))}</p>
                        : <></>
                      }
                        
                      { 
                        (article.mitad != '')
                        ? <p className='m-0 fw-medium fs-5 text-center text-secondary'>Mitad: <span className='fw-bold text-black fst-italic'>{article.mitad}</span></p>
                        : <></>
                      }
  
                      <p className='m-0 fw-medium fs-5 text-center text-secondary'>Precio: <span className='fw-bold text-black fst-italic'>{article.precioVariosArticles}</span></p>
                    </div>
                  ))
                }
              </div>
  
              { (SeletedOrder.deliveryInfo.costo > 0) ? 
                <>
                  <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                    <p className='m-0 fw-bold fs-5 w-25'>Delivery:</p>
                    <p className='m-0 fw-medium fs-5 w-75 text-end'>{SeletedOrder.deliveryInfo.costo}</p>
                  </div>
  
                  <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                    <p className='m-0 fw-bold fs-5 w-25'>Ubicacion:</p>
                    <p className='m-0 fw-medium fs-5 w-75 text-end'>{SeletedOrder.deliveryInfo.lugar}: {SeletedOrder.direccion}</p>
                  </div>
                </>
              : 
                <div className='d-flex justify-content-center align-items-center border-bottom py-2'>
                  <p className='m-0 fw-medium fs-5 fw-bold'>La viene a buscar</p>
                </div>
              }
  
              {
                (SeletedOrder.comentario.length > 0) ? 
                  <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                    <p className='m-0 fw-bold fs-5 w-25'>comentario:</p>
                    <p className='m-0 fw-medium fs-5 w-75 text-end'>{SeletedOrder.comentario}</p>
                  </div>
                : <></>
              }
  
              </div>
  
              <div className='d-flex justify-content-between border-top border-success p-3'>
                <p className='m-0 fw-bold fs-5 w-25'>Total:</p>
                <p className='m-0 fw-bold fs-5 w-75 text-end'>{total}</p>
              </div>
  
          </div>    
  
        </section>
      </main>
    );
  }
}

export default SeeOrder;
