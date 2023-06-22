import React, { useContext, useEffect, useState } from 'react';

// React Icon
import { ImCancelCircle } from 'react-icons/im';
import { GrSubtractCircle } from 'react-icons/gr';
import { BsPlusCircle } from 'react-icons/bs';

// Context
import { AppContext } from '../../../context/AppContext';

// Firebase
import { getUrlImage } from '../../../firebase/firebaseStorage';

const OrderSelectArticle = ({setViewOrderSelectArticle}) => {

  const {color1, articleSelected, categorySelected,  setArticleSelected, precioArticleSelected, setPrecioArticleSelected, setCart,  cartOfCategoryPoints, setCartOfCategoryPoints, infoPointsUser} = useContext(AppContext);

  
  const [img, setImg] = useState(null);
  
  // pedido
  const [valorArticulo, setValorArticulo] = useState(0);
  const [valorVariosArticulos, setValorVariosArticulos] = useState(0);
  const [valorPuntosArticulo, setValorPuntosArticulo] = useState(0);
  const [valorPuntosVariosArticulos, setValorPuntosVariosArticulos] = useState(0);
  const [ingredientes, setIngredientes] = useState([]);
  const [ingredienteMitad, setIngredienteMitad] = useState('');
  const [cantidadArticulo, setCantidadArticulo] = useState(1);


  useEffect( () => {
    // Obtiene img del articulo
    const f = async () => {
      const res = await getUrlImage(articleSelected.imgpath);
      setImg(res);
      // console.log(precioArticleSelected);
      // console.log(articleSelected);
      
      if( articleSelected.complex ) setValorArticulo(precioArticleSelected.sizeArticlePrice);
      else setValorArticulo(articleSelected.precios);;
    }
    f();
  }, [] );

  // Para establecer precio o puntos
  useEffect( () => {
    if(articleSelected.complex){
      let valor = 0;

      valor += Number(precioArticleSelected.sizeArticlePrice);
      ingredientes.map((ingrediente) => {
        console.log(ingrediente.precio.precio);
        valor += Number(ingrediente.precio.precio); 
      });
      setValorArticulo(valor);
      valor *= cantidadArticulo;
      setValorVariosArticulos(valor);
    }else if(categorySelected.isCategoryOfPoints == false) {
      console.log(articleSelected.precios);
      let valor = articleSelected.precios;
      setValorArticulo(valor);
      valor *= cantidadArticulo;
      setValorVariosArticulos(valor);
    }else if(categorySelected.isCategoryOfPoints == true) {
      // console.log(categorySelected.isCategoryOfPoints);
      let valor = articleSelected.puntos;
      setValorPuntosArticulo(valor);
      valor *= cantidadArticulo;
      setValorPuntosVariosArticulos(valor);
    }
  }, [ingredientes, cantidadArticulo] );

  const handleClickAdicional = (e, adicional, precio) => {
    const checked = e.target.checked;
    if( checked ){
      setIngredientes(state => ([...state, {adicional, precio}]));
    }else {
      const arrayModificado = ingredientes.filter(ingrediente => ingrediente.adicional != adicional);
      setIngredientes(arrayModificado);
    }
  }
  
  const handleClickMitad = (ingrediente) => setIngredienteMitad(ingrediente);

  const handleClickAddCantidadArticulo = () => setCantidadArticulo(cantidadArticulo + 1);
  const handleClickReduceCantidadArticulo = () => {
    if(cantidadArticulo == 1) return;
    setCantidadArticulo(cantidadArticulo - 1);
  };

  const handleClickAgregar = () => {

    if(!categorySelected.isCategoryOfPoints){
      const pedido = {
        ingredientePrincipal: articleSelected.titulo,
        ingredientesAdicionales: ingredientes,
        cantidad: cantidadArticulo,
        mitad: articleSelected.complex ? ingredienteMitad : '',
        precio: valorArticulo,
        precioVariosArticles: valorVariosArticulos,
        size: articleSelected.complex ? precioArticleSelected.sizeArticle : '',
        imgArticlePath: img,
        id: articleSelected.id,
        categoria: categorySelected,
        complex: articleSelected.complex,
      }
      setCart(state => ([...state, pedido]));
      handleClickBack();
      console.log(pedido);
    }else if(categorySelected.isCategoryOfPoints){
      console.log(infoPointsUser)
      const pointsUser = infoPointsUser.puntosRestantes;
      let pointsMakeOrder = Number(valorPuntosVariosArticulos);
      cartOfCategoryPoints.forEach((element) => {
        pointsMakeOrder += element.PuntosVariosArticles;
      });
      if(pointsUser < pointsMakeOrder){
        alert('No puedes seleccionar este articulo porque no tienen sufientes puntos');
        return;
      }
      const pedido = {
        ingredientePrincipal: articleSelected.titulo,
        ingredientesAdicionales: ingredientes,
        cantidad: cantidadArticulo,
        mitad: articleSelected.complex ? ingredienteMitad : '',
        puntos: valorPuntosArticulo,
        PuntosVariosArticles: valorPuntosVariosArticulos,
        size: articleSelected.complex ? precioArticleSelected.sizeArticle : '',
        imgArticlePath: img,
        id: articleSelected.id,
        categoria: categorySelected,
        complex: articleSelected.complex,
      }
      setCartOfCategoryPoints(state => ([...state, pedido]));
      handleClickBack();
      console.log(pedido);
    }

  }

  const handleClickBack = () => {
    setArticleSelected(null);
    setPrecioArticleSelected(null);
    setViewOrderSelectArticle(false);
  }

  return (
    <div className='position-absolute top-0 start-0 w-100 bg-danger vh-100 overflow-hidden z-1'>
      <section className='z-0 overflow-hidden' style={{height:'25%'}}>
        <ImCancelCircle className='position-absolute text-white display-3' style={{top:20, left:20}} onClick={handleClickBack} />
        <img src={img} className='w-100 object-fit-cover ' style={{height:'100%'}} />
      </section>
      <section className='bg-white rounded-5 shadow-lg rounded-bottom-0 w-100 position-relative p-4 d-flex flex-column justify-content-between' style={{height:'77.3%', bottom:19}}>

        <div>
          { articleSelected.complex 
            ? <h2 className='fs-1 fw-bold'>{articleSelected.titulo} - {precioArticleSelected.sizeArticle}"</h2>
            : <h2 className='fs-1 fw-bold'>{articleSelected.titulo}</h2>
          }
          

          <p className='m-0 fs-4 fw-normal overflow-scroll' style={{maxHeight:'150px'}}>{articleSelected.subtitulo}</p>

          { articleSelected.complex ?
            <div className="accordion my-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="btn form-control d-flex justify-content-between align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <p className='fs-5 m-0 fw-bold'>Ingredientes adicionales</p>
                    <p className='fs-6 m-0 text-secondary'>Requerido</p>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">

                    { Object.keys(precioArticleSelected.adicionales).map((adicional, i)=>( 
                        <div key={i} className="form-check d-flex justify-content-between">
                          <div>
                            <input className="form-check-input" type="checkbox" value="" id={`flexCheck${i}`} onClick={(e)=>handleClickAdicional(e, adicional, precioArticleSelected.adicionales[adicional])}/>
                            <label className="form-check-label" htmlFor={`flexCheck${i}`}>
                              {adicional}
                            </label>
                          </div>
                          <p className='m-0 text-secondary'>
                            {precioArticleSelected.adicionales[adicional].precio}
                          </p>
                        </div>
                      ))
                    }

                  </div>
                </div>
              </div>
            </div>
            : <></>
          }

          { articleSelected.complex ? 
            // SI ES MITAD Y MITAD
            <div className="accordion my-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="btn form-control d-flex justify-content-between align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <p className='fs-5 m-0 fw-bold'>Mitad</p>
                    <p className='fs-6 m-0 text-secondary'>Obcional</p>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    
                  { Object.keys(precioArticleSelected.adicionales).map((adicional, i)=>( 
                    <AdicionalesList key={i} adicional={adicional} isMiddle={precioArticleSelected.adicionales[adicional].isMiddle} i={i} handleClickMitad={handleClickMitad} />
                  ))
                  }

                  </div>
                </div>
              </div>
            </div>
          : <></>
          }

        </div>

        <footer className='row gap-3' style={{height:50}}>
          <div className='d-flex align-items-center row col-5'>
            <GrSubtractCircle className='display-4 col-4' onClick={handleClickReduceCantidadArticulo} />
            <p className='mb-2 display-3 fw-bold col-4 text-center'>{cantidadArticulo}</p>
            <BsPlusCircle className='display-4 col-4' onClick={handleClickAddCantidadArticulo} />
          </div>
          <button className={`btn ${color1.btn} d-flex justify-content-between align-items-center col-7`} onClick={handleClickAgregar}>
            <p className='m-0 fs-3'>Agregar</p>
            <p className='m-0 fs-3'>{!categorySelected.isCategoryOfPoints ? `${valorVariosArticulos} RD$` : `${valorPuntosVariosArticulos} puntos` } </p>
          </button>
        </footer>

      </section>

    </div>
  )
}

export default OrderSelectArticle;

const AdicionalesList = ({adicional, isMiddle, i, handleClickMitad}) => {

  useEffect( () => {
    console.log(isMiddle);
  }, [] );

  if(isMiddle){
    return (
      <div className='d-flex justify-content-between'>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id={`flexRadio${i}`} onClick={()=>handleClickMitad(adicional)} />
          <label className="form-check-label" htmlFor={`flexRadio${i}`}>
            {adicional}
          </label>
        </div>
        <p className='m-0 text-secondary'>
        {/* {precioArticleSelected.adicionales[adicional]} */}
        </p>
      </div>
    )
  }
}




