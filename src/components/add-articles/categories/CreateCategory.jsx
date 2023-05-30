import React, { useState } from 'react';

// React-Icons
import { BsCloudUploadFill } from 'react-icons/bs';


// uuid
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { createCategories } from '../../../firebase/firebaseFirestore';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Header
import CreateArticleHeader from '../sections/CreateArticleHeader';
import { uploadImage } from '../../../firebase/firebaseStorage';
// import CreateArticleHeader from './CreateArticleHeader';

const CreateCategory = () => {
  const navigate = useNavigate();

  const [nombreCategoria, setNombreCategoria] = useState('');
  const [imgCategory, setImgCategory] = useState(null);
  const [viewInHome, setViewInHome] = useState(false);
  const [viewInMenu, setViewInMenu] = useState(true);


  const handleChangeNombre = (e) => setNombreCategoria(e.target.value);
  const handleChangeCheckedViewInHome = (e) => setViewInHome(e.target.checked);
  const handleChangeCheckedViewInMenu = (e) => setViewInMenu(e.target.checked);

  const handleClickImg = () => document.querySelector('#select-img').click();
  const handleChangeSelectImg = (e) => setImgCategory(e.target.files[0]);

  const handleClickAddArticle = async () => {
    if(nombreCategoria.length > 3 && imgCategory != null){
      const id = uuidv4();
      const categoryInfo = {
        id: id, 
        nombreCategoria: nombreCategoria, 
        viewInHome: viewInHome, 
        viewInMenu:viewInMenu,
        imgpath: `imagenes/${id}`
      }
      const res = await createCategories(categoryInfo);
      const resImg = await uploadImage(id, imgCategory);
      if(res === true && resImg === true) navigate('/view-categories');
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
          <div>
            <p className='fs-3 fw-bold m-0 mb-2'>Imagen:</p>
            <div className='d-flex justify-content-center align-items-center' style={{width:'100%', height:200, border: 'dashed green 2px'}} onClick={handleClickImg}>
              <BsCloudUploadFill className='text-success' style={{fontSize:100}} />
            </div>
            <input id='select-img' accept='image/*' type="file" hidden onChange={handleChangeSelectImg} />
          </div>

          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="handleChangeCheckedViewInHome" onChange={handleChangeCheckedViewInHome} />
            <label className="form-check-label" htmlFor="handleChangeCheckedViewInHome">Deseas que esta categoria se muestre en el inicio de la app ?</label>
          </div>

          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="handleChangeCheckedViewInMenu" defaultChecked onChange={handleChangeCheckedViewInMenu} />
            <label className="form-check-label" htmlFor="handleChangeCheckedViewInMenu">Deseas que esta categoria se muestre en el menu de la app ?</label>
          </div>

        </div>
        <button className='btn form-control btn-success mt-5 p-2 fs-3' onClick={handleClickAddArticle}>Crear Categoria</button>
      </div>
    </section>
  )
}


export default CreateCategory
