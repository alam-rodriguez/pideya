import React, { useContext, useEffect, useState } from 'react';

// React-Icons
import { MdPlaylistAddCheckCircle } from 'react-icons/md';
import { BsCloudUploadFill } from 'react-icons/bs';

// uuid
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { createArticle, getAllArticles, getArticlesCategoryPoints, getCategories } from '../../../../firebase/firebaseFirestore';
import { uploadImage } from '../../../../firebase/firebaseStorage';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Header
import Header from '../ajustes-puntos-componentes/Header';

// Context
import { AppContext } from '../../../../context/AppContext';

const ViewArticlesPuntos = () => {
  const navigate = useNavigate();

  const { categorySelected, articleSelected, setArticleSelected } = useContext(AppContext);

  const [articles, setArticles] = useState(null);

  useEffect( () => {
    const f = async () => { 
      const res = await getArticlesCategoryPoints(categorySelected.id);
      console.log(res)
      setArticles(res);
    }
    f();
  }, [] );

  // handles
  const handleClickArticle = (article) => {
    setArticleSelected(article);
    navigate('/admin-options/ajustes-puntos/create-article');
  }

  const handleClickCrearArticulo = () => navigate('/admin-options/ajustes-puntos/create-article');

  const handleClickAtras = () => navigate('/admin-options/ajustes-puntos/view-category');

  if(articles != null){
    return (
      <main className='border-0 mx-3' >
        {/* Header */}
        <Header handleClickAtras={handleClickAtras} />
  
        <section className='d-flex flex-column gap-4'>
  
          { articles.length > 0 
            ? articles.map((article)=>(
              <div className='border-bottom py-3' key={article.id} onClick={ ()=>handleClickArticle(article) } >
                <p className='m-0 fs-1 fw-medium'>{article.titulo}</p>
              </div>
            ))
          : <p className='m-0 text-center fs-3 fw-medium mt-5'>No hay ningun articulo</p> 
          }
  
          <button className='btn form-control btn-success fs-3 position-absolute bottom-0 start-50 mb-4 translate-middle rounded-0' onClick={handleClickCrearArticulo}>Crear Articulo</button>
  
        </section>
      </main>
    )
  }else {
    return(
      <main className='d-flex justify-content-center align-items-center vh-100'>
        <div className="spinner-border text-success fs-2" role="status" style={{height:50, width:50}}>
          <span className="visually-hidden">Loading...</span>
        </div> 
      </main>
    );
  }
}


export default ViewArticlesPuntos;

