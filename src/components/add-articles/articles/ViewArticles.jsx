import React, { useContext, useEffect, useState } from 'react';

// React-Icons
import { MdPlaylistAddCheckCircle } from 'react-icons/md';
import { BsCloudUploadFill } from 'react-icons/bs';

// uuid
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { createArticle, getAllArticles, getCategories } from '../../../firebase/firebaseFirestore';
import { uploadImage } from '../../../firebase/firebaseStorage';
// import { createArticle, createCategories } from '../../firebase/firebaseFirestore';
// import { uploadImage } from '../../firebase/firebaseStorage';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Header
import CreateArticleHeader from '../sections/CreateArticleHeader';

// Context
import { AppContext } from '../../../context/AppContext';

const ViewArticles = () => {
  const navigate = useNavigate();

  const { articleSelected, setArticleSelected, setCategories} = useContext(AppContext);

  const [articles, setArticles] = useState(null);

  useEffect( () => {
    const f = async () => { 
      const res = await getAllArticles();
      setArticles(res);
      console.log(res);
    }
    f();
  }, [] );

  // handles
  const handleClickArticle = (article) => {
    setArticleSelected(article);
    navigate('/edit-article');
  }

  const handleClickCrearCategoria = () => navigate('/create-article');

  if(articles != null){
    return (
      <main className='border-0 mx-3 d-block vh-100 bg-warning- ' >
        {/* Header */}
        <CreateArticleHeader path='/admin-options' whatReset='articleSeletc' />
  
        <section className='d-flex flex-column gap-5  bg-danger- ' style={{height:''}}>
  
          { articles != null 
            ? articles.length > 0 
              ? articles.map((article)=>(
                 <div className='border-bottom py-2' key={article.id} onClick={()=>handleClickArticle(article)}>
                    <p className='m-0 fs-1 fw-medium'>{article.titulo}</p>
                  </div>
                ))
              : <p className='m-0 fs-1 fw-medium text-center'>No hay articulos</p>
            : <></>
          }

          <div>
             <button className='btn form-control btn-success fs-3 position-fixed bottom-0 start-50 mb-4 translate-middle rounded-0' onClick={handleClickCrearCategoria}>Crear Categoria</button>
          </div>
  
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


export default ViewArticles;

