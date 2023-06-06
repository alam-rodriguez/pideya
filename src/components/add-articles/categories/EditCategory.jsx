import React, { useContext, useEffect, useState } from 'react';

// React-Icons
import { BsCloudUploadFill } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';


// uuid
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { ACtualizarCategory, createCategories, deleteCategory } from '../../../firebase/firebaseFirestore';
import { deleteImage, getUrlImage, uploadImage } from '../../../firebase/firebaseStorage';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Header
import CreateArticleHeader from '../sections/CreateArticleHeader';
import Header from '../add-articles-components/Header';
// import CreateArticleHeader from './CreateArticleHeader';

// Context
import { AppContext } from '../../../context/AppContext';

const EditCategory = () => {
  const navigate = useNavigate();

  const { categorySelected, setCategorySelected} = useContext(AppContext);

  const [imgPath, setImgPath] = useState(null);

  useEffect( () => {
    if(categorySelected == null){
      navigate('/view-categories');
      return;
    }
    // setNombreCategoria(categorySelected.nombre);
    // setImgCategory(categorySelected.imgpath);
    // setViewInHome(categorySelected.viewInHome);
    // setViewInMenu(categorySelected.viewInMenu);
    getImagePath();
  }, [] );

  // Para obtener path de la imagen
  const getImagePath = async () => {
    const imgpath = await getUrlImage(categorySelected.imgpath);
    setImgPath(imgpath);
  }

  const [nombreCategoria, setNombreCategoria] = useState(categorySelected.nombre);
  const [sizeView, setSizeView] = useState(categorySelected.sizeView);
  const [imgCategory, setImgCategory] = useState(categorySelected.imgpath);
  const [viewInHome, setViewInHome] = useState(categorySelected.viewInHome);
  const [viewInMenu, setViewInMenu] = useState(categorySelected.viewInMenu);


  const handleChangeNombre = (e) => setNombreCategoria(e.target.value);
  const handleChangeSizeView = (e) => setSizeView(e.target.value);
  const handleChangeCheckedViewInHome = (e) => setViewInHome(e.target.checked);
  const handleChangeCheckedViewInMenu = (e) => setViewInMenu(e.target.checked);

  const handleClickImg = () => document.querySelector('#select-img').click();
  const handleChangeSelectImg = (e) => setImgCategory(e.target.files[0]);

  const handleClickDeleteCategory = async () => {
    const res1 = await deleteCategory(categorySelected.id);
    const res2 = await deleteImage(categorySelected.id);
    if(res1 && res2){
      navigate('/view-categories');
    }else {
      alert('ha ocurrido un error al eliminar la imagen');
    }
  }

  const handleClickActualizarCategory = async () => {
    if(nombreCategoria.length > 3){
      const newInfo = {
        nombreCategoria: nombreCategoria, 
        sizeView: sizeView,
        viewInHome: viewInHome, 
        viewInMenu:viewInMenu,
      }
      const res = await ACtualizarCategory(categorySelected.id, newInfo);
      if( imgCategory != categorySelected.imgpath) {
        const resImg = await uploadImage(categorySelected.id, imgCategory);
        if(!resImg) alert('Ha ocurrido un error al cambiar la imagen')
      }
      if(res === true ) navigate('/view-categories');
    }
  }

  if( categorySelected != null){
    return (
      <section className='border-0 border-bottom border-top' >
        {/* Header */}
        <Header path='/view-categories' />
  
        <div className='my-5 mx-3'>
          <div className='row mx-auto'>

            <div>
              <p className='fs-3 fw-bold m-0 mb-2'>Titulo:</p>
              <input className='form-control rounded border-secondary' type="text" style={{height:35}} value={nombreCategoria} onChange={handleChangeNombre}/>
            </div>

            <div>
              <p className='fs-3 fw-bold m-0 mb-2'>Tamaño al visualizar:</p>
              <select className='form-control border-secondary' style={{height:35}} onChange={handleChangeSizeView}>
                <option selected value={sizeView}>{sizeView}</option>
                <option value="small">Pequeño</option>
                <option value="normal">Normal</option>
                <option value="big">Gande</option>
              </select>
            </div>

            {/* <input type="text" className='col-12 border-1 fs-3 p-3 border rounded-4' placeholder='Nombre de la nueva Categoria' value={nombreCategoria} onChange={handleChangeNombre} /> */}
            {/* <MdPlaylistAddCheckCircle className='col-3 display-1 text-success' onClick={handleClickAddArticle} /> */}
            <div>
              <p className='fs-3 fw-bold m-0 mb-2'>Imagen:</p>

              
              <div className='d-flex justify-content-center align-items-center p-2 rounded-5' style={{width:'100%', height:200, border: 'dashed green 2px'}} onClick={handleClickImg}>
                { imgPath == null ?
                    <div className="spinner-border text-success" style={{height:70, width:70}} role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  : <img className='object-fit-cover rounded-5' style={{width:'100%', height:'100%'}} src={imgPath} onClick={handleClickImg} />
                }
              </div>
              <input id='select-img' accept='image/*' type="file" hidden onChange={handleChangeSelectImg} />
            </div>
  
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="handleChangeCheckedViewInHome" checked={viewInHome} onChange={handleChangeCheckedViewInHome} />
              <label className="form-check-label" htmlFor="handleChangeCheckedViewInHome">Deseas que esta categoria se muestre en el inicio de la app ?</label>
            </div>
  
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="handleChangeCheckedViewInMenu" checked={viewInMenu} onChange={handleChangeCheckedViewInMenu} />
              <label className="form-check-label" htmlFor="handleChangeCheckedViewInMenu">Deseas que esta categoria se muestre en el menu de la app ?</label>
            </div>

            <MdDeleteForever className='text-danger mt-4' style={{fontSize: 80}} onClick={handleClickDeleteCategory} />
  
          </div>
          <button className='btn form-control btn-success mt-5 p-2 fs-3' onClick={handleClickActualizarCategory}>Actualizar Categoria</button>
        </div>
      </section>
    );
  }else {
    return <></>;
  }
}


export default EditCategory
