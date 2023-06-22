import React, { useEffect, useState } from 'react'

const PedidoItem = ({orden}) => {

  const [mitad, setMitad] = useState(null);

  const [total, setTotal] = useState(0);

  useEffect( () => {
    console.log( orden.pedido );
    console.log('----------------');
    let total = 0;
    orden.pedido.map( (item) => {
      if(item.mitad != '') setMitad(item.mitad);
      total += Number( item.precioVariosArticles );
      // console.log();
    });
    if( orden.deliveryInfo != '' ) total += Number(orden.deliveryInfo.costo);
    setTotal( total );
    console.log('----------------');
  }, [] );

  return (
    <div className='border m-4 shadow-lg rounded-5 border border-success'>

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

        <div className='d-flex justify-content-between border-bottom py-2'>
          <p className='m-0 fw-bold fs-5 w-25'>Estado del pedido:</p>
          { (!orden.wasView && !orden.isReady)
            ? <p className='m-0 fw-medium fs-5 w-75 text-end'>Su orden fue enviada, en los proximos minutos la vamos a empezar a trabajar.</p>
            : (orden.wasView && !orden.isReady)
            ? <p className='m-0 fw-medium fs-5 w-75 text-end'>Ya estamos trabando en su pedido.</p>
            : (orden.wasView && orden.isReady)
            ? <p className='m-0 fw-medium fs-5 w-75 text-end'>Ya su pedido esta listo.</p>
            :<></>
          }
        </div>
              
        <div className='py-2'>
          { orden.pedido.length > 0 ? 
            <>
              <p className='m-0 fw-bold fs-4 text-center'>Articulos:</p>
              { orden.pedido.map( (article, i) => (
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
              ))}
            </>
            : <></>
          }

          { (orden.pedidoOfPoints.length > 0) ?
            <>
              <p className='m-0 fw-bold fs-4 text-center'>Articulos de Puntos:</p>

              { orden.pedidoOfPoints.map( (article, i) => (
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
          
          {
            orden.deliveryInfo.costo > 0
              ? <p className='m-0 fw-medium fs-5 text-center text-secondary'>Delivery: <span className='fw-bold text-black fst-italic'>{orden.deliveryInfo.costo}</span></p>
              : <></>
          }

        </div>

      </div>

      <div className='d-flex justify-content-between border-top border-success p-3'>
        <p className='m-0 fw-bold fs-5 w-25'>Total:</p>
        <p className='m-0 fw-bold fs-5 w-75 text-end'>{total}</p>
      </div>

    </div>
  );
}

export default PedidoItem;


{/* <div className='py-2'>
                <p className='m-0 fw-bold fs-4 text-center'>Articulos:</p>
                <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                  <p className='m-0 fw-medium fs-5 w-75'>5-Pizzas Pedazos con pollo, maiz y jamon</p>
                  <p className='m-0 fw-medium fs-5 w-25 text-end'>$300</p>
                </div>
                <div className='d-flex justify-content-between border-bottom align-items-center py-2' >
                  <p className='m-0 fw-medium fs-5 w-75'>5-Pizzas Pedazos con pollo</p>
                  <p className='m-0 fw-medium fs-5 w-25 text-end'>$300</p>
                </div>
              </div> */}