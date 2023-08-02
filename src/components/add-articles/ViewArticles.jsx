// React
import React from 'react';

// React Router
import { useNavigate } from 'react-router-dom';

// Componentes
import CreateArticleHeader from './sections/CreateArticleHeader';

const AdminOptions = () => {

  const navigate = useNavigate();

  // Handles
  const handleClickViewCategories = () => navigate('/view-categories') ;
  const handleClickViewArticles = () => navigate('/view-articles');
  const handleClickviewEstadisticasApp = () => navigate('/admin-options/view-estadisticas-app');
  const handleClickAjustesPuntos = () => navigate('/admin-options/ajustes-puntos');
  const handleClickViewListArticles = () => navigate('/admin-options/list-clients');

  return (
    <section className='container'>

      {/* Header */}
      <CreateArticleHeader path='/home' />

      {/* Btn para ver las categorias */}
      <button className='btn form-control btn-success mt-5 p-2 fs-3' onClick={handleClickViewCategories}>Ver las Categorias</button>

      {/* Btn para ver los articulos */}
      <button className='btn form-control btn-success mt-5 p-2 fs-3' onClick={handleClickViewArticles}>Ver los Articulos</button>

      <button className='btn form-control btn-success mt-5 p-2 fs-3' onClick={handleClickviewEstadisticasApp}>Estadiscas de app</button>

      <button className='btn form-control btn-success mt-5 p-2 fs-3' onClick={handleClickViewListArticles}>Lista de Clientes</button>

      <button className='btn form-control btn-success mt-5 p-2 fs-3' onClick={handleClickAjustesPuntos}>Ajustes de Puntos</button>
      
    </section>
  );
}

export default AdminOptions;
