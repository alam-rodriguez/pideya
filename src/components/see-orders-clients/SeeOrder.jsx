import React, { useContext, useEffect, useState } from 'react';

// Firebase
import { UpdateOrderClient, getPointsUser, getordersNotView, savePointsUser, savePuntosGeneradosForOrder } from '../../firebase/firebaseFirestore';

// Components
import Header from './see-orders-clients-components/Header';

// Context
import { AppContext } from '../../context/AppContext';

// React-Rounter-Dom
import { useNavigate } from 'react-router-dom';

const SeeOrder = () => {

  const navigate = useNavigate()

  const { SeletedOrder: seletedOrder, setSeletedOrder } = useContext(AppContext);

  const [total, setTotal] = useState(0);
  
  useEffect( () => {
    if(seletedOrder == null) {
      navigate('/see-orders');
      return;
    }
    let total = 0;
    seletedOrder.pedido.map( (item) => {
      total += Number(item.precioVariosArticles);
    });
    total += Number(seletedOrder.deliveryInfo.costo);
    setTotal(total);
    console.log(seletedOrder);
  }, [] );
  
  const [isReady, setIsReady] = useState(seletedOrder.isReady);
  const [givePoints, setgivePoints] = useState(seletedOrder.recibioPuntos);
  
  useEffect( () => {
    if(seletedOrder != null){
      const f = async () => {
        if(seletedOrder.isReady != isReady || seletedOrder.wasView == false){
          const res = await UpdateOrderClient(seletedOrder.email, seletedOrder.id, isReady);
          if(res){
            alert('Pedido Actualizado');
          }else {
            alert('Error al actualizar pedido');
          }
        }
      }
      f();
    }
  }, [isReady] );
  
  // useEffect( () => {
  //   // if(infoPoints != null && clientOrders != null){
  //     if(seletedOrder.pointsInfo.wantPoints == true && givePoints != seletedOrder.recibioPuntos){
  //       // clientOrders.forEach( (order) => {
  //         console.log('first')
  //         let total = 0
  //         // if(seletedOrder.recibioPuntos == false){
	// 					seletedOrder.pedido.forEach( (pedido) => {
	// 						total += pedido.precioVariosArticles;
	// 					});
	// 				// }
	// 				const puntosOrden = (total / Number(seletedOrder.pointsInfo.eachMoneyGenerateOnePoint));
  //         console.log( seletedOrder.pedido );
	// 				const f = async () => {
  //           const res = await savePuntosGeneradosForOrder(seletedOrder.email, seletedOrder.id, puntosOrden, givePoints);
  //           const oldPoints = await getPointsUser(seletedOrder.email);
  //           console.log(puntosOrden);
  //           let newPoints = Number(oldPoints.puntos);
  //           if(givePoints == true){
  //             newPoints = Number(newPoints) + Number(puntosOrden);
  //           }else {
  //             newPoints = Number(newPoints) - Number(puntosOrden);
  //           }
  //           console.log(newPoints);
  //           const res3 = await savePointsUser(seletedOrder.email, newPoints);
	// 					if(res){
  //             console.log(`${puntosOrden} puntos generados`);
	// 					}
	// 				}
	// 				f();
	// 				console.log( puntosOrden );
  //         // });
  //         // console.log(infoPoints);
  //       }
  //       // console.log(infoPoints)
  //       // }
  //     }, [givePoints] );
      
  const handleChangeIsReady = (e) => {
    setIsReady(e.target.checked);
    console.log(e.target.checked)
  };

  const handleChangeGivePoints = (e) => {
    setgivePoints(e.target.checked);
  }

const handleClickGuardar = async () => {

  let workChangeIsReady = true;
  let workAddPuntos = true;


  if(isReady != seletedOrder.isReady){
    workChangeIsReady = await UpdateOrderClient(seletedOrder.email, seletedOrder.id, isReady);
  }



  if(seletedOrder.pointsInfo.wantPoints){
    let total = 0
    seletedOrder.pedido.forEach( (pedido) => {
      total += pedido.precioVariosArticles;
    });
    const puntosOrden = (total / Number(seletedOrder.pointsInfo.eachMoneyGenerateOnePoint));
  
    const res = await savePuntosGeneradosForOrder(seletedOrder.email, seletedOrder.id, puntosOrden, givePoints);
    const oldPoints = await getPointsUser(seletedOrder.email);
      
    let newPoints = Number(oldPoints.puntos);
    if(givePoints == true){
      newPoints = Number(newPoints) + Number(puntosOrden);
    }else {
      newPoints = Number(newPoints) - Number(puntosOrden);
    }
      
    const res3 = await savePointsUser(seletedOrder.email, newPoints);
    if(res || oldPoints || res3){
      workAddPuntos = true;
    }else{
      workAddPuntos = false;
    } 
  }

  if( workChangeIsReady && workAddPuntos ){
    alert('Pedido actualizado con exito');
  }else {
    alert('Ha ocurrido un error al actualizar el pedido');
  }

}

  if(seletedOrder != null){
    return (
      <main className=''>
        <Header link='/see-orders' title='Pedido' />
  
        <section className=''>
         
          <div key={seletedOrder.id} className='border m-4 shadow-lg rounded-5 border border-success'>
  
            <p className='m-0 fw-bold fs-3 text-center py-2 border-bottom border-success'>{seletedOrder.user}</p>
            <div className='p-3'>
  
              <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                <p className='m-0 fw-bold fs-5 w-25'>Pedido id:</p>
                <p className='m-0 fw-medium fs-5 w-75 text-end'>{seletedOrder.id}</p>
              </div>
  
              <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                <p className='m-0 fw-bold fs-5 w-25'>Fecha:</p>
                <p className='m-0 fw-medium fs-5 w-75 text-end'>{seletedOrder.dia}, {seletedOrder.hora}</p>
              </div>
  
              <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                <p className='m-0 fw-bold fs-5 w-25'>Numero:</p>
                <p className='m-0 fw-medium fs-5 w-75 text-end'>{seletedOrder.telefono}</p>
              </div>
  
              <div className='py-2'>
                <p className='m-0 fw-bold fs-4 text-center'>Articulos:</p>
                { 
                  seletedOrder.pedido.map( (article, i) => (
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
  
              { (seletedOrder.deliveryInfo.costo > 0) ? 
                <>
                  <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                    <p className='m-0 fw-bold fs-5 w-25'>Delivery:</p>
                    <p className='m-0 fw-medium fs-5 w-75 text-end'>{seletedOrder.deliveryInfo.costo}</p>
                  </div>
  
                  <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                    <p className='m-0 fw-bold fs-5 w-25'>Ubicacion:</p>
                    <p className='m-0 fw-medium fs-5 w-75 text-end'>{seletedOrder.deliveryInfo.lugar}: {seletedOrder.direccion}</p>
                  </div>
                </>
              : 
                <div className='d-flex justify-content-center align-items-center border-bottom py-2'>
                  <p className='m-0 fw-medium fs-5 fw-bold'>La viene a buscar</p>
                </div>
              }

              { seletedOrder.pointsInfo.wantPoints ?
                <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                  <p className='m-0 fw-bold fs-5 w-25'>Puntos generados:</p>
                  <p className='m-0 fw-medium fs-5 w-75 text-end'>{seletedOrder.recibioPuntos ? seletedOrder.puntosGenerados : 0}</p>
                </div>
              : <></>
              }
  
              {
                (seletedOrder.comentario.length > 0) ? 
                  <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                    <p className='m-0 fw-bold fs-5 w-25'>comentario:</p>
                    <p className='m-0 fw-medium fs-5 w-75 text-end'>{seletedOrder.comentario}</p>
                  </div>
                : <></>
              }
  
              </div>
  
              <div className='d-flex justify-content-between border-top border-success p-3'>
                <p className='m-0 fw-bold fs-5 w-25'>Total:</p>
                <p className='m-0 fw-bold fs-5 w-75 text-end'>{total}</p>
              </div>
  
          </div>    

          <div>
            {/* <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
              <label className="form-check-label" htmlFor="flexSwitchCheckChecked">ya hemos visto el pedido</label>
            </div> */}
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={isReady} onChange={handleChangeIsReady} />
              <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Ya esta listo el pedido ?</label>
            </div>

            { seletedOrder.pointsInfo.wantPoints ?
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={givePoints} onChange={handleChangeGivePoints} />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Otorgar {seletedOrder.puntosGenerados} puntos del pedido ?</label>
              </div>
            : <></>
            }

            <button className='btn btn-success form-control fs-3 mt-5 p-2' onClick={handleClickGuardar}>Guardar</button>

          </div>
  
        </section>
      </main>
    );
  }
}

export default SeeOrder;
