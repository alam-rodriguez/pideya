// React
import React, { useContext } from 'react';

// React Icon
import { IoIosArrowBack } from 'react-icons/io';

// React Router
import { useNavigate } from 'react-router-dom';

// Context
import { AppContext } from '../../context/AppContext';

// Componentes
import CreateArticleHeader from './sections/CreateArticleHeader';
import ArticlesCategories from './sections/ArticlesCategories';
import BtnCreateArticle from './sections/BtnCreateArticle';

// /admin-options

const AdminOptions = () => {
  const navigate = useNavigate();

  const { appCategories } = useContext(AppContext);

  const handleClickCrearArticulos = () => {

  }

  const handleClickViewCategories =() => {
    navigate('/view-categories');
  }
  const handleClickViewArticles = () => {
    navigate('/view-articles');
  }
  
  return (
    <section className='container'>

      {/* Header */}
      <CreateArticleHeader path='/home' />

      {/* Btn para ver las categorias */}
      <button className='btn form-control btn-success mt-5 p-2 fs-3' onClick={handleClickViewCategories}>Ver las Categorias</button>

      {/* Btn para ver los articulos */}
      <button className='btn form-control btn-success mt-5 p-2 fs-3' onClick={handleClickViewArticles}>Ver los Articulos</button>


      {/* <ArticlesCategories appCategories={appCategories} /> */}

      {/* create article */}
      {/* <BtnCreateArticle /> */}
      
    </section>
  );
}

export default AdminOptions
