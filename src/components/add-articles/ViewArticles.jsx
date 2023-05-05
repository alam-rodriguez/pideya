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

const ViewArticles = () => {

  const { appCategories } = useContext(AppContext);

  const handleClickCrearArticulos = () => {

  }
  
  return (
    <section className='container'>

      {/* Header */}
      <CreateArticleHeader path='/home' />


      {/* Categories */}
      <ArticlesCategories appCategories={appCategories} />

      {/* create article */}
      <BtnCreateArticle />
      
    </section>
  );
}

export default ViewArticles
