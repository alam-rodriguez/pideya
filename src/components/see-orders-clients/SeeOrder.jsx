import React, { useContext, useEffect, useState } from 'react';

// Firebase
import { UpdateOrderClient, addReferidoPor, createEstadisticas, deleteEstadistica, editEstadistica, editPoints, getEachStatitics, getEstadisticaOfPedido, getEstadisticas, getInfoUser, getPointsUser, getordersNotView, obtenerInfoApp, saveEstadistacaUser, saveEstadistacasUser, saveEstadistica, savePointsUser, savePuntosGeneradosForOrder } from '../../firebase/firebaseFirestore';

// Components
import Header from './see-orders-clients-components/Header';
import ItemList from './see-orders-clients-components/ItemList';

// Context
import { AppContext } from '../../context/AppContext';

// React-Rounter-Dom
import { useNavigate } from 'react-router-dom';

const SeeOrder = () => {

  const navigate = useNavigate();

  const [estadisticasUser, setEstadisticasUser] = useState(null);

  const { SeletedOrder: seletedOrder, setSeletedOrder } = useContext(AppContext);

  const [total, setTotal] = useState(0);

  const [puntos, setPuntos] = useState(0);

  const [puntosGastados, setPuntosGastados] = useState(0);

  const [infoUserRef, setInfoUserRef] = useState(null);

  const [infoPoints, setInfoPoints] = useState(null);
  
  // Crea y obtiene estadisticas de usuarios
  useEffect( () => {
    const f = async () => {
      const estadisticas = await getEstadisticas(seletedOrder.email);
      if(estadisticas.dineroGastado != undefined){
        setEstadisticasUser(estadisticas);
      }else if(estadisticas == 'no estadisticas'){
        const firstEstadisticas = {
          dineroGastado: 0,
          puntosGanados: 0,
          puntosGastados: 0,
          puntosRestantes: 0,
        }
        const res = await createEstadisticas(seletedOrder.email, firstEstadisticas);
        if( res ) setEstadisticasUser(firstEstadisticas);
        else console.log( res );
      }
      const infoPointsApp = await obtenerInfoApp();
      console.log( infoPointsApp );
      setInfoPoints( infoPointsApp.infoPoints );
      const infoUser = await getInfoUser(seletedOrder.email);
      console.log(infoUser);
      setInfoUserRef(infoUser.referidoPor);
    }
    f();
    console.log( seletedOrder );
  }, [] )


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
    let puntos = 0;
    console.log( seletedOrder );
    seletedOrder.pedido.forEach( (item) => {
      puntos = puntos + Number(item.precioVariosArticles);
    });
    console.log( puntos );
    console.log(Number(puntos) )
    puntos = Number(puntos) / Number(seletedOrder.pointsInfo.eachPointValue);
    setPuntos(puntos);

    if(seletedOrder.pedidoOfPoints.length > 0){
      let puntosGastadosPedido = 0;
      seletedOrder.pedidoOfPoints.forEach( (item) => {
        puntosGastadosPedido += Number(item.PuntosVariosArticles);
      });
      setPuntosGastados(puntosGastadosPedido);
    }
  }, [] );
  
  const [isReady, setIsReady] = useState(seletedOrder.isReady);
  const [paid, setPaid] = useState(seletedOrder.paid);
  const [givePoints, setgivePoints] = useState(seletedOrder.recibioPuntos);
  
  useEffect( () => {
    if(seletedOrder != null){
      const f = async () => {
        if(seletedOrder.isReady != isReady || seletedOrder.wasView == false){
          const res = await UpdateOrderClient(seletedOrder.email, seletedOrder.id, isReady, paid);
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
  const handleChangePaid = (e) => {
    if(!e.target.checked) setgivePoints(false);
    setPaid(e.target.checked);
    console.log(e.target.checked)
  };

  const handleChangeGivePoints = (e) => {
    if(!paid) alert('No puedes darles los puntos al usuario si no ha pagado');  
    else setgivePoints(e.target.checked);
    console.log('kk')
  }

const handleClickGuardar = async () => {

  let workChangeIsReady = true;
  let workAddPuntos = true;


  if(isReady != seletedOrder.isReady || paid != seletedOrder.paid){
    workChangeIsReady = await UpdateOrderClient(seletedOrder.email, seletedOrder.id, isReady, paid);
  }

  if(seletedOrder.pointsInfo.activatePoints){
    let total = 0
    seletedOrder.pedido.forEach( (pedido) => {
      total += pedido.precioVariosArticles;
    });
    // const puntos = (total / Number(seletedOrder.pointsInfo.eachMoneyGenerateOnePoint));
  
    const res = await savePuntosGeneradosForOrder(seletedOrder.email, seletedOrder.id, puntos, givePoints);
    const oldPoints = await getPointsUser(seletedOrder.email);
      
    let newPoints = Number(oldPoints.puntos);
    if(givePoints == true){
      newPoints = Number(newPoints) + Number(puntos);
    }else {
      newPoints = Number(newPoints) - Number(puntos);
    }

    // const res3 = await editPoints(seletedOrder.email);
      
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

  



  // let data = {
  //   dineroGastado: 0,
  //   idsVisitas: [],
  //   visitas: [],
  //   puntosGenerados: 0,
  //   puntosGastados: 0,
  // };
  // const ids = [];


  // let estadistacasUser = await getEstadisticasUser(seletedOrder.email); 
  
    if(paid){
      const visita = {
        id: seletedOrder.id,
        fecha: `${seletedOrder.dia} ${seletedOrder.hora}`,
        gastado: seletedOrder.total,
        puntosGenerados: givePoints ? puntos : 0,
      }
      const guardarEstadisca = await saveEstadistica(seletedOrder.email, visita);
      if(guardarEstadisca){
        console.log('Estadistica guardada');
      }
    }else if(!paid){
      const res = await deleteEstadistica(seletedOrder.email, seletedOrder.id);
      if(res){
        console.log('Estadistica borrada')
      }
      if(estadisticasUser.puntosRestantes > seletedOrder.puntosGenerados) {
        alert('No puedes quitarles estos puntos porque el usuario ya los uso');
      }
    }

    const statistics = await getEachStatitics(seletedOrder.email);
    // if(statistics.length > 0){
      let dineroGastado = 0;
      let puntosGanados = 0;
      statistics.forEach((statistic)=>{
        dineroGastado += statistic.gastado;
        puntosGanados += statistic.puntosGenerados;
      })
      console.log(estadisticasUser)
      const newStatistics = {
        dineroGastado: dineroGastado,
        puntosGanados: puntosGanados,
        puntosGastados: estadisticasUser.puntosGastados,
        puntosRestantes: puntosGanados - estadisticasUser.puntosGastados,
      }

      // if( !infoUserRef.givePointsForSpendMoney && newStatistics.dineroGastado > seletedOrder.pointsInfo.minForSpend ) {
      //   newStatistics.givePointsForSpendMoney = true;
      // }

      // if( !infoUser.givePointsForSpendMoney && dineroGastado > seletedOrder.pointsInfo.minForSpend ) {
        givePointsToFriend(newStatistics);
        // TODO:
      // }

      const res = await editEstadistica(seletedOrder.email, newStatistics);
      if(res){
        console.log('Estadisticas actualizadas')
      }
    // }

    // actualizar estadisticas
    
    // if(givePoints){
    //   const newEstadisticas = {
    //     dineroGastado: estadisticasUser.dineroGastado + seletedOrder.total,
    //     puntosGanados: estadisticasUser.puntosGanados + seletedOrder.puntosGenerados,
    //     puntosGastados: estadisticasUser.puntosGastados,
    //     puntosRestantes: estadisticasUser.puntosRestantes,
    //   }
    //   const res = await editEstadistica(seletedOrder.email, newEstadisticas);
    //   console.log(res);
    // }else if(!givePoints){
    //   const newEstadisticas = {
    //     dineroGastado: estadisticasUser.dineroGastado - seletedOrder.total,
    //     puntosGanados: estadisticasUser.puntosGanados - seletedOrder.puntosGenerados,
    //     puntosGastados: estadisticasUser.puntosGastados,
    //     puntosRestantes: estadisticasUser.puntosRestantes,
    //   }
    //   const res = await editEstadistica(seletedOrder.email, newEstadisticas);
    //   console.log(res);
    // }


  
    // data.visitas.forEach( (visita) => {
    // 	ids.push(visita.id);
    // });
    // let dineroGastado = 0;
    // let puntosGenerados = 0;
    // puntosGastados
    // visitas.forEach( (visita) => {
    //   if(data.visitas.includes())
    //   dineroGastado += Number(visita.precioVariosArticles);
    // });
    // const res = await getEstadisticasUser(email);
    // if(res == 'no estadisticas')
    // console.log(res);

}

const givePointsToFriend = async (statistics) => {
  // console.log( infoUserRef.givePointsForSpendMoney );
  console.log( infoUserRef );
  // console.log( statistics.dineroGastado );
  // console.log( seletedOrder.pointsInfo.minForSpend );

  console.log(infoPoints.pointsForMinSpend);

  
  
  if( !infoUserRef.givePointsForSpendMoney && statistics.dineroGastado > seletedOrder.pointsInfo.minForSpend ) {
    // Edito el referido por
    const NewinfoUserRef = {...infoUserRef};
    NewinfoUserRef.givePointsForSpendMoney = true;
    const updateReferidoPor = await addReferidoPor(seletedOrder.email, NewinfoUserRef);

    // Edito estadisticas de amigo
    const estadisticasAmigo = await getEstadisticas(infoUserRef.email);
    const newEstadistcas = {
      dineroGastado: estadisticasAmigo.dineroGastado, 
      puntosGanados: estadisticasAmigo.puntosGanados + Number(infoPoints.pointsForMinSpend),
      puntosGastados: estadisticasAmigo.puntosGastados,
      puntosRestantes: estadisticasAmigo.puntosRestantes + Number(infoPoints.pointsForMinSpend),
    }
    const res3 = await editEstadistica(infoUserRef.email, newEstadistcas);
    console.log(res3);



    console.log( infoUserRef.givePointsForSpendMoney );
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

              <ItemList 
                clave='Pedido id:' 
                valor={seletedOrder.id}
              />

              <ItemList 
                clave='Fecha:' 
                valor={`${seletedOrder.dia}, ${seletedOrder.hora}`}
              />

              <ItemList 
                clave='Numero:' 
                valor={seletedOrder.telefono}
              />  

              { (seletedOrder.deliveryInfo.costo > 0) ? 
                <ItemList 
                  clave='Ubicacion:' 
                  valor={`${seletedOrder.deliveryInfo.lugar}: ${seletedOrder.direccion}`}
                />      
              : <></>
              }        
  
              <div className='py-2'>
                { seletedOrder.pedido.length > 0 ? 
                  <>
                    <p className='m-0 fw-bold fs-4 text-center'>Articulos:</p>
                    { seletedOrder.pedido.map( (article, i) => (
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
                        <br />
                      </div>
                    ))}
                  </>
                  : <></>
                }

                { (seletedOrder.pedidoOfPoints.length > 0) ?
                  <>
                    <p className='m-0 fw-bold fs-4 text-center'>Articulos de Puntos:</p>

                    { seletedOrder.pedidoOfPoints.map( (article, i) => (
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

                        <p className='m-0 fw-medium fs-5 text-center text-secondary'>Precio: <span className='fw-bold text-black fst-italic'>{article.PuntosVariosArticles}</span></p>
                      </div>
                    ))}
                  </>
                : <></>
                }

                { puntos > 0 ?
                  <>
                    <p className='m-0 fw-bold fs-4 text-center'>Articulos de puntos:</p>
                    { seletedOrder.pedidoOfPoints.map( (article, i) => (
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
    
                        <p className='m-0 fw-medium fs-5 text-center text-secondary'>Puntos: <span className='fw-bold text-black fst-italic'>{article.PuntosVariosArticles}</span></p>
                      </div>
                    ))}
                  </>
                  : <></>
                }
              </div>

              { (seletedOrder.deliveryInfo.costo > 0) ? 
                <ItemList 
                  clave='Delivery:' 
                  valor={seletedOrder.deliveryInfo.costo}
                />        
              : <div className='d-flex justify-content-center align-items-center border-bottom py-2'>
                  <p className='m-0 fw-medium fs-5 fw-bold'>La viene a buscar</p>
                </div>
              }

              { puntosGastados > 0 ?
                 <ItemList 
                  clave='Puntos Gastados:' 
                  valor={puntosGastados}
                />
              : <></> 
              }

              { seletedOrder.pointsInfo.activatePoints && seletedOrder.total > 0 ?
                <ItemList 
                  clave='Puntos generados:' 
                  valor={seletedOrder.recibioPuntos ? seletedOrder.puntosGenerados : 0}
                />
              : <></>
              }

              {/* { seletedOrder.pointsInfo.activatePoints ?
                <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                  <p className='m-0 fw-bold fs-5 w-25'>Puntos generados:</p>
                  <p className='m-0 fw-medium fs-5 w-75 text-end'>{seletedOrder.recibioPuntos ? seletedOrder.puntosGenerados : 0}</p>
                </div>
              : <></>
              } */}
  
              {
                (seletedOrder.comentario.length > 0) ? 
                  <ItemList 
                    clave='comentario:' 
                    valor={seletedOrder.comentario}
                  />
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

            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={paid} onChange={handleChangePaid} />
              <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Pago y ya recibio correctamente el pedido ?</label>
            </div>

            { seletedOrder.pointsInfo.activatePoints && puntos > 5 ?
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={givePoints} onChange={handleChangeGivePoints} />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Otorgar {puntos} puntos del pedido ?</label>
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
