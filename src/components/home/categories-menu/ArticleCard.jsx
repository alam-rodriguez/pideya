import React, { useContext, useEffect, useState } from 'react'

// React Router
import { useNavigate } from 'react-router-dom';

// Context
import { AppContext } from '../../../context/AppContext';

// Firebase 
import { getUrlImage } from '../../../firebase/firebaseStorage';

// React-Icons
import { FaPizzaSlice } from 'react-icons/fa';

const ArticleCard = ({title, subTitle, price, img, size, isCategoryOfPoints, id, setViewArticleSelected }) => {
  const navigate = useNavigate();

  const [imgUrl, setImgUrl] = useState(null);

  useEffect( () => {
    console.log( isCategoryOfPoints );
    const f = async () => {
      const res = await getUrlImage(img);
      setImgUrl(res);
    }
    f();
  }, [] );

  const { color1, articleSeleted, setArticleSeleted, viewMenu } = useContext(AppContext);

  const handleClick = () => {
    if(viewMenu) return;
    setArticleSeleted({
      imgUrl, 
      title, 
      subTitle, 
      id,
    });
    setViewArticleSelected('abrir');
    // navigate('/article');
  }

  if(size == 'small'){
    if(isCategoryOfPoints){
      return (
        <div className='animate__animated animate__fadeInLeft me-4 rounded-5 overflow-hidden d-flex flex-column' style={{height:190, width:160, minWidth:160}}>
          <div className='d-flex justify-content-center align-items-center position-relative' style={{height:'65%'}}  onClick={handleClick}>
            { imgUrl == null ? 
              <div className="spinner-border text-success fs-1" style={{height:50, width:50}} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            : <img className='w-100 h-100 object-fit-cover' src={imgUrl} alt="" />
            } 
            <div className='d-flex align-items-center gap-1 py-1 px-2 rounded-end-5 position-absolute bottom-0 start-0 z-2 bg-success'>
              <p className='m-0 text-white fs-6'>{price}</p>
              <FaPizzaSlice className='fs-6 text-white' />
            </div>
          </div>
          <div className='mx-3' style={{height:'35%'}}>
            <p className='m-0 fs-4 fw-medium'>{title}</p>
          </div>
        </div>
      );
    }else{
      return (
        <div className='animate__animated animate__fadeInLeft me-4 rounded-5 overflow-hidden d-flex justify-content-center align-items-center border' style={{height:190, width:160, minWidth:160}} onClick={handleClick}>
        { imgUrl == null ? 
          <div className="spinner-border text-success fs-1" style={{height:50, width:50}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        : <img className='w-100 h-100 object-fit-cover' src={imgUrl} alt="" />
        } 
      </div>
      );
    }
  }else if(size == 'normal'){
    return (
      <div className='animate__animated animate__fadeInLeft me-4 rounded-5 overflow-hidden d-flex justify-content-center align-items-center border' style={{height:160, width:240, minWidth:240}} onClick={handleClick}>
        { imgUrl == null ? 
          <div className="spinner-border text-success fs-1 border" style={{height:50, width:50}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        : <img className='w-100 h-100 object-fit-cover' src={imgUrl} alt="" />
        } 
      </div>
    );
  }else if(size == 'big'){
    return (
      <div className='animate__animated animate__fadeInLeft me-4 rounded-5 overflow-hidden d-flex justify-content-center align-items-center border' style={{height:150, width:230, minWidth:230}} onClick={handleClick}>
        { imgUrl == null ? 
          <div className="spinner-border text-success fs-1" style={{height:50, width:50}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        : <img className='w-100 h-100 object-fit-cover' src={imgUrl} alt="" />
        } 
      </div>
    );
  }
}

export default ArticleCard;
