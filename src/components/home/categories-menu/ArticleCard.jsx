import React, { useContext, useEffect, useState } from 'react'

// React Router
import { useNavigate } from 'react-router-dom';

// Context
import { AppContext } from '../../../context/AppContext';

// Firebase 
import { getUrlImage } from '../../../firebase/firebaseStorage';

// React-Icons
import { FaPizzaSlice } from 'react-icons/fa';

// images
import imgGris from '../../../images/home/gris.jpg'

const ArticleCard = ({title, subTitle, price, img, size, isCategoryOfPoints, id, setViewArticleSelected }) => {

  const navigate = useNavigate();

  const { color1, articleSeleted, setArticleSeleted, viewMenu, imagenesArticulos, setImagenesArticulos, haEstadoEnHome } = useContext(AppContext);

  const [imgUrl, setImgUrl] = useState(null);

  const [realPath, setRealPath] = useState(null);

  useEffect(() => {
    // console.log(img)
    if(img != undefined) setRealPath(img.split('/')[1]);
  }, [img] );

  useEffect( () => {
    // console.log(img)
    if(img == null) {
      setImgUrl(imgGris);
      return;
    }
    // console.log( isCategoryOfPoints );
    const f = async () => {
      const res = await getUrlImage(img);
      // setImgUrl(res);
    }
    f();
  }, [] );

  const handleClick = () => {
    // console.log(imgs.split('/')[1])

    if(viewMenu) return;
    setArticleSeleted({
      img, 
      title, 
      subTitle, 
      id,
    });
    // console.log({
    //   img, 
    //   title, 
    //   subTitle, 
    //   id,
    // });
    setViewArticleSelected('abrir');
    // navigate('/article');
  }
  

  if(size == 'small'){
    if(isCategoryOfPoints){
      return (
        <div className={`${!haEstadoEnHome ? 'animate__animated....animate__fadeIn' : ''}  me-4 rounded-5 overflow-hidden d-flex flex-column`} style={{height:190, width:160, minWidth:160}}>
          <div className='d-flex justify-content-center align-items-center position-relative' style={{height:'65%'}}  onClick={handleClick}>
            
            { img != null 
              ? <img className='w-100 h-100 object-fit-cover animate__animated animate__fadeIn' src={img} alt="" />
              : <></>
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
        <div className={`${!haEstadoEnHome ? 'animate__animated...animate__fadeIn' : ''} me-4 rounded-5 overflow-hidden d-flex justify-content-center align-items-center border`} style={{height:190, width:160, minWidth:160}} onClick={handleClick}>
        { img != null 
          ? <img className='w-100 h-100 object-fit-cover animate__animated animate__fadeIn' src={img} alt="" />
          : <></>
        }
      </div>
      );
    }
  }else if(size == 'normal'){
    return (
      <div className={`${!haEstadoEnHome ? 'animate__animated...animate__fadeIn' : ''} me-4 rounded-5 overflow-hidden d-flex justify-content-center align-items-center border`} style={{height:160, width:240, minWidth:240}} onClick={handleClick}>
        { img != null 
          ? <img className='w-100 h-100 object-fit-cover animate__animated animate__fadeIn' src={img} alt="" />
          : <></>
        }
      </div>
    );
  }else if(size == 'big'){
    return (
      <div className={`${!haEstadoEnHome ? 'animate__animated...animate__fadeIn' : ''} me-4 rounded-5 overflow-hidden d-flex justify-content-center align-items-center border`} style={{height:200, width:350, minWidth:350}} onClick={handleClick}>
        {/* { imgUrl == null ? 
          <div className="spinner-border text-success fs-1" style={{height:50, width:50}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        : <img className='w-100 h-100 object-fit-cover' src={imgUrl} alt="" />
        }  */}
        {/* { realPath != null && imagenesArticulos != null 
          ? <img className='w-100 h-100 object-fit-cover' src={img} alt="" />
          : <></>
        } */}
        { img != null 
          ? <img className='w-100 h-100 object-fit-cover animate__animated animate__fadeIn' src={img} alt="" />
          : <></>
        }
      </div>
    );
  }
}

export default ArticleCard;
