import React, { useContext, useEffect, useState } from 'react'

// React Router
import { useNavigate } from 'react-router-dom';

// Context
import { AppContext } from '../../../context/AppContext';

// Firebase 
import { getUrlImage } from '../../../firebase/firebaseStorage';

const ArticleCard = ({img, title, subTitle, id}) => {
  const navigate = useNavigate();

  const [imgUrl, setImgUrl] = useState(null);

  useEffect( () => {
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
    navigate('/article');
  }

  return (
    <div className='me-4 rounded-5 overflow-hidden d-flex justify-content-center align-items-center border' style={{height:150, width:230, minWidth:230}} onClick={handleClick}>
      { imgUrl == null ? 
        <div className="spinner-border text-success fs-1" style={{height:50, width:50}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      : <img className='w-100 h-100 object-fit-cover' src={imgUrl} alt="" />
      } 
       
    </div>
  )
}

export default ArticleCard;
