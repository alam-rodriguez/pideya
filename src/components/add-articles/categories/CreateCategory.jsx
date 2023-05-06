import React, { useState } from 'react';

// React-Icons
import { MdPlaylistAddCheckCircle } from 'react-icons/md';

// uuid
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { createCategories } from '../../../firebase/firebaseFirestore';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Header
import CreateArticleHeader from '../sections/CreateArticleHeader';
// import CreateArticleHeader from './CreateArticleHeader';

const CreateCategory = () => {
  const navigate = useNavigate();

  const [nombreCategoria, setNombreCategoria] = useState('');
  const [viewInMenu, setViewInMenu] = useState(false);

  const handleChangeNombre = (e) => setNombreCategoria(e.target.value);
  const handleChangeChecked = (e) => setViewInMenu(e.target.checked);

  const handleClickAddArticle = async () => {
    if(nombreCategoria.length > 3){
      const res = await createCategories(uuidv4(), nombreCategoria, viewInMenu);
      if(res === true) navigate('/view-categories');
    }
  }

  const handleClickAtras = () => navigate('/view-categories');

  // const handleClickAddCategoria = () => navigate('CreateCategory');

  return (
    <section className='border-0 border-bottom border-top' >
      {/* Header */}
      <CreateArticleHeader path='/view-categories' />

      <div className='my-5 mx-3'>
        <div className='row mx-auto'>
          <input type="text" className='col-12 border-1 fs-3 p-3' placeholder='Nombre de la nueva Categoria' onChange={handleChangeNombre} />
          {/* <MdPlaylistAddCheckCircle className='col-3 display-1 text-success' onClick={handleClickAddArticle} /> */}
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={handleChangeChecked} />
            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Deseas que esta categoria se muestre en inicio de la app ?</label>
          </div>
        </div>
        <button className='btn form-control btn-success mt-5 p-2 fs-3' onClick={handleClickAddArticle}>Crear Categoria</button>
      </div>
    </section>
  )
}


export default CreateCategory
