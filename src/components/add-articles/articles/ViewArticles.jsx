import React, { useEffect, useState } from 'react';

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
// import CreateArticleHeader from './sections/CreateArticleHeader';
// import CreateArticleHeader from './CreateArticleHeader';

const ViewArticles = () => {
  const navigate = useNavigate();

  const [articles, setArticles] = useState(null);

  useEffect( () => {
    const f = async () => { 
      const res = await getAllArticles();
      setArticles(res);
    }
    f();
  }, [] );

  const handleClickAtras = () => navigate('/add-article');

  // handles
  const handleClickCrearCategoria = () => navigate('/create-article');

  return (
    <main className='border-0 border-bottom border-top mx-3' >
      {/* Header */}
      <CreateArticleHeader path='/admin-options' />

      <section className='d-flex flex-column gap-4'>

        { articles != null 
          ? articles.map((article)=>(
            <div key={article.id}>
              <p>{article.titulo}</p>
            </div>
          ))
        : <></>}

        <button className='btn form-control btn-success fs-3 position-absolute bottom-0 start-50 mb-4 translate-middle rounded-0' onClick={handleClickCrearCategoria}>Crear Categoria</button>

      </section>
    </main>
  )
}


export default ViewArticles;