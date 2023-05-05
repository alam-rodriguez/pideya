import React, { useState } from 'react';

// React-Icons
import { MdPlaylistAddCheckCircle } from 'react-icons/md';

// uuid
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { createCategories } from '../../firebase/firebaseFirestore';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Header
import CreateArticleHeader from './sections/CreateArticleHeader';
// import CreateArticleHeader from './CreateArticleHeader';

const CreateCategory = () => {
  const navigate = useNavigate();

  const [nombreCategoria, setNombreCategoria] = useState('');

  const handleChangeNombre = (e) => setNombreCategoria(e.target.value);

  const handleClickAddArticle = async () => {
    if(nombreCategoria.length > 3){
      await createCategories(uuidv4(), nombreCategoria);
    }
  }

  const handleClickAtras = () => navigate('/add-article');

  // const handleClickAddCategoria = () => navigate('CreateCategory');

  return (
    <section className='border-0 border-bottom border-top' >
      {/* Header */}
      <CreateArticleHeader path='/view-articles' />

      <div className='my-5 mx-3'>
        <div className='row mx-auto'>
          <input type="text" className='col-12 border-1 fs-3 p-3' placeholder='Nombre de la nueva Categoria' onChange={handleChangeNombre} />
          {/* <MdPlaylistAddCheckCircle className='col-3 display-1 text-success' onClick={handleClickAddArticle} /> */}
        </div>
        <button className='btn form-control btn-success mt-5 p-2 fs-3' onClick={handleClickAddArticle}>Crear Categoria</button>
      </div>
    </section>
  )
}


export default CreateCategory
