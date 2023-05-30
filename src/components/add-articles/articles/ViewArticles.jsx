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

  const { articleSelected, setArticleSelected } = useContext(AppContext);

  const [articles, setArticles] = useState(null);

  useEffect( () => {
    const f = async () => { 
      const res = await getAllArticles();
      setArticles(res);
    }
    f();
  }, [] );

  // handles
  const handleClickArticle = (article) => {
    setArticleSelected(article);
    navigate('/edit-article');
  }

  const handleClickCrearCategoria = () => navigate('/create-article');

  return (
    <main className='border-0 mx-3' >
      {/* Header */}
      <CreateArticleHeader path='/admin-options' />

      <section className='d-flex flex-column gap-4'>

        { articles != null 
          ? articles.map((article)=>(
            <div className='border-bottom py-2' key={article.id} onClick={ ()=>handleClickArticle(article) } >
              <p className='m-0 fs-1 fw-medium'>{article.titulo}</p>
            </div>
          ))
        : <></>}

        <button className='btn form-control btn-success fs-3 position-absolute bottom-0 start-50 mb-4 translate-middle rounded-0' onClick={handleClickCrearCategoria}>Crear Categoria</button>

      </section>
    </main>
  )
}


export default ViewArticles;