import React, { useContext, useEffect, useState } from 'react';


// Firebase
import { getArticlesByCategory, getEstadisticas } from '../../../firebase/firebaseFirestore';
import { getUrlImage } from '../../../firebase/firebaseStorage';

// Context
import { AppContext } from '../../../context/AppContext';

// React Router Dom
import { useNavigate } from 'react-router-dom';

const MenuViewArticles = ({id, titulo, imgpath, articulo, setViewPreviewInfoArticle }) => {
  const navigate = useNavigate();

  const { email, color1, articleSelected, setArticleSelected, cart, infoPointsUser, setInfoPointsUser} = useContext(AppContext);

  // // const [categories, setCategories] = useState(null);
  const [img, setImg] = useState(null);

  const [countItem, setCountItem] = useState(0);

  // Obtener puntos del usuario
  useEffect( () => {
		if(infoPointsUser == null){
			const f = async () => {
				const pointsUser = await getEstadisticas(email);
				if(pointsUser != 'no estadisticas' && pointsUser != false) setInfoPointsUser(pointsUser);
        else if(pointsUser != 'no estadisticas') setInfoPointsUser({
          dineroGastado: 0,
          puntosGanados: 0,
          puntosGastados: 0,
          puntosRestantes: 0,
        });
				console.log(pointsUser);
			}
			f();
		}
	}, [] );

  const handleClick = () => {
    setArticleSelected(articulo);
    setViewPreviewInfoArticle(true);
    console.log(articulo.complex);
  }

  useEffect( () => {
    // console.log(titulo)
    const f = async () => {
      const img = await getUrlImage(imgpath);
      setImg(img);
    }
    f();
  }, [] );

  useEffect( () => {
    let cantidad = 0;
    cart.map((article)=>{
      if( id == article.id) cantidad += 1;
    });
    setCountItem(cantidad);
  }, [cart] );

  return (
    <div className='d-flex flex-column border rounded-4 overflow-hidden position-relative z-0' style={{height:190, width:170}} onClick={handleClick}>
      { countItem > 0 
        ? <div className={`${color1.bgColor} rounded-circle position-absolute top-0 end-0 m-3 shadow  d-flex justify-content-center align-content-center `} style={{height:30, width:30}}>
            <p className='fs-3 text-white' >{countItem}</p>
          </div>
        : <></>
      }
      { img != null
        ? <img className='object-fit-cover' style={{height:'65%'}} src={img} alt="" />
        : <div className="spinner-border text-success fs-2" role="status" style={{height:50, width:50}}>
            <span className="visually-hidden">Loading...</span>
          </div> 
      }
      <p className='m-0 fs-2 fw-bold px-2' style={{height:'35%'}}>{titulo}</p>
    </div>
  );
}

export default MenuViewArticles;
