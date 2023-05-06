import React, { useContext, useEffect, useState } from 'react'

// React Router
import { useNavigate } from 'react-router-dom';

// Context
import { AppContext } from '../../../context/AppContext';

// Firebase 
import { getUrlImage } from '../../../firebase/firebaseStorage';

const ArticleCard = ({img, title, subTitle, id}) => {
  const navigate = useNavigate();

  const [imgUrl, setImgUrl] = useState('');

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
    <div className='bg-danger me-4 rounded-5 overflow-hidden' style={{height:150, width:230}} onClick={handleClick}>
        <img className='w-100 h-100 object-fit-cover' src={imgUrl} alt="" />
    </div>
  )
}

export default ArticleCard;
