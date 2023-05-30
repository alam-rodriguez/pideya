import React, { useContext, useEffect } from 'react';

// Context
import { AppContext } from '../../../context/AppContext';

const PreviewInfoArticle = ({setViewPreviewInfoArticle, setViewOrderSelectArticle}) => {
  const {color1, articleSelected, setArticleSelected, precioArticleSelected, setPrecioArticleSelected} = useContext(AppContext);

  useEffect( () => {
    console.log(articleSelected.complex);
    if(!articleSelected.complex){
      // console.log(precio);
      // setPrecioArticleSelected(precio);
      setViewPreviewInfoArticle(false);
      setViewOrderSelectArticle(true);
    }
  }, [] );

  const handleClickPrecio = (precio) => {
    console.log(precio);
    setPrecioArticleSelected(precio);
    setViewPreviewInfoArticle(false);
    setViewOrderSelectArticle(true);
  }

  const handleClickCancelar = () => {
    setArticleSelected(null);
    setViewPreviewInfoArticle(false);
  }

  if( articleSelected.complex ){
    return (
      <div className='z-3 bg-white position-absolute bottom-0 start-50 border translate-middle-x mb-3 rounded-3 shadow p-4 d-flex flex-column justify-content-between' style={{width:'95%', height:'45%'}}>
        <div>
          <h3 className='fw-bold fs-2'>{articleSelected.titulo}</h3>
          <div className='my-4'>
            { articleSelected.precios.map( (precio, i) => (
                <div key={i} className='border-bottom d-flex justify-content-between py-4' onClick={()=>handleClickPrecio(precio)}>
                  <p className='fs-2 m-0'>- {precio.sizeArticle}"</p>
                  <p className='fs-2  m-0 text-secondary'>RD$ {precio.sizeArticlePrice}</p>
                </div>
              ))
            }
          </div>
        </div>
        <button className={`btn form-control fs-3 ${color1.textColor}`} onClick={handleClickCancelar}>Cancelar</button>
      </div>
    );
  }else {
    return <></>;
  }
}

export default PreviewInfoArticle
