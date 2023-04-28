// React
import React, { useContext, useEffect } from 'react';

// Context
import { AppContext } from '../context/AppContext';

// React Router
import { useNavigate } from 'react-router-dom';

// react Icons
import { ImCancelCircle } from 'react-icons/im';

const Article = () => {
  const navigate = useNavigate();

    const { color1, articleSeleted, setArticleSeleted } = useContext(AppContext);

    useEffect(()=>{
      if(articleSeleted == null) navigate('/home');
    }, [] );

    const handleClickBack = () => {
      setArticleSeleted(null);
      navigate('/home');
    }

  if(articleSeleted != null){
    return (
      <main className='vh-100 position-relative'>
        <ImCancelCircle className='position-absolute text-white display-3' style={{top:20, left:20}} onClick={handleClickBack} />
        <img className='w-100 object-fit-cover'  src={articleSeleted.img} style={{height:'78%'}} />
        <div className='d-flex flex-column justify-content-between h-25 bg-white rounded-5 position-absolute bottom-0 w-100 p-4 pt-0 shadow-lg'>
            <div className='align-self-center mt-2 bg-secondary rounded-5' style={{height:4, width:40}}></div>
            <h3 className='fw-bold fs-2 mt-3'>{articleSeleted.title}</h3>
            <p className='fs-6 fw-medium overflow-y-scroll over'>{articleSeleted.subTitle}</p>
            <button className={`btn form-control text-white fs-4 p-2 ${color1.bgColor}`}>Ordenar Ahora</button>
        </div>
      </main>
    );
  }
}

export default Article
