import React, { useContext, useEffect, useState } from 'react';

// React-Icons
import { BsCloudUploadFill } from 'react-icons/bs';


// uuid
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { createCategoryPunto, updateCategoryPunto } from '../../../../firebase/firebaseFirestore';
import { getUrlImage, uploadImage } from '../../../../firebase/firebaseStorage';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Header
import Header from '../ajustes-puntos-componentes/Header';

// Context
import { AppContext } from '../../../../context/AppContext';

const CreateCategory = () => {

  const navigate = useNavigate();

  const { categorySelected, setCategorySelected, email } = useContext(AppContext);

  // Effecs
  useEffect( () => {
    if(email == null && categorySelected == null){
      navigate('/admin-options/ajustes-puntos/view-category');
      return;
    }
    if(categorySelected != null){
      setNombreCategoria(categorySelected.nombre);
      setSizeView(categorySelected.sizeView);
      const f = async () => {
        const resImg = await getUrlImage(categorySelected.imgpath);
        setImgpath(resImg);
        console.log(resImg);
      }
      f();
      setViewInHome(categorySelected.viewInHome);
      setViewInMenu(categorySelected.viewInMenu);
    }
  }, [] );

  const [nombreCategoria, setNombreCategoria] = useState('');
  const [sizeView, setSizeView] = useState('small');
  const [imgCategory, setImgCategory] = useState(null);
  const [viewInHome, setViewInHome] = useState(false);
  const [viewInMenu, setViewInMenu] = useState(true);

  const [imgpath, setImgpath] = useState(null);


  const handleChangeNombre = (e) => setNombreCategoria(e.target.value);
  const handleChangeSizeView = (e) => setSizeView(e.target.value);
  const handleChangeCheckedViewInHome = (e) => setViewInHome(e.target.checked);
  const handleChangeCheckedViewInMenu = (e) => setViewInMenu(e.target.checked);

  const handleClickImg = () => document.querySelector('#select-img').click();
  const handleChangeSelectImg = (e) => setImgCategory(e.target.files[0]);

  const handleClickAddArticle = async () => {
    if(nombreCategoria.length > 2 && imgCategory != null){
      const id = uuidv4();
      const categoryInfo = {
        id: id, 
        nombreCategoria: nombreCategoria, 
        sizeView: sizeView,
        viewInHome: viewInHome, 
        viewInMenu:viewInMenu,
        imgpath: `imagenes/${id}`,
        isCategoryOfPoints: true,
      }
      console.log( categoryInfo );
      const res = await createCategoryPunto(categoryInfo);
      const resImg = await uploadImage(id, imgCategory);
      if(res === true && resImg === true) navigate('/admin-options/ajustes-puntos/view-category');
    }else if(nombreCategoria.length < 2){
      alert('El nombre de la categoria debe de tener por lo menos 3 caracteres');
    }else if(imgCategory == null){
      alert('Debe seleccionar una imagen obligatoriamente');
    }
  }

  const handleClickUpdateArticle = async () => {
      if(nombreCategoria.length > 2){
        const categoryInfo = {
          id: categorySelected.id, 
          nombreCategoria: nombreCategoria, 
          sizeView: sizeView,
          viewInHome: viewInHome, 
          viewInMenu: viewInMenu,
          imgpath: categorySelected.imgpath,
        }
        const res = await updateCategoryPunto(categoryInfo);
        if(imgCategory != null){
          const resImg = await uploadImage(categorySelected.id, imgCategory);
          if(res === true && resImg === true) navigate('/admin-options/ajustes-puntos/view-category');
        }
        if(res === true) navigate('/admin-options/ajustes-puntos/view-category');
      } else {
        alert('El nuevo nombre de la categoria debe de tener minimo 3 caracteres');
      }
    }
  

  const handleClickAtras = () => navigate('/view-categories');

  // const handleClickAddCategoria = () => navigate('CreateCategory');

  if(categorySelected != null){
    return (
      <section className='border-0 border-bottom border-top' >
        {/* Header */}
        <Header link='/admin-options/ajustes-puntos/view-category' />
  
        <div className='my-5 mx-3'>
          <div className='row mx-auto d-flex flex-column gap-4'>

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
                <option value="big">Grande</option>
              </select>
            </div>
  
            <div>
              <p className='fs-3 fw-bold m-0 mb-2'>Imagen:</p>
              <div className='d-flex justify-content-center align-items-center p-4 rounded-5' style={{width:'100%', height:200, border: 'dashed green 2px'}} onClick={handleClickImg}>
                { imgpath == null ?
                  <div className="spinner-border text-success fs-2" role="status" style={{height:50, width:50}}>
                    <span className="visually-hidden">Loading...</span>
                  </div> 
                  : <img src={imgpath} className='object-fit-cover w-100 h-100 rounded-5' /> 
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
  
          </div>
          <button className='btn form-control btn-success mt-5 p-2 fs-3' onClick={handleClickUpdateArticle}>Actualizar Categoria</button>
        </div>
      </section>
    );
  }else {
    return (
      <section className='border-0 border-bottom border-top' >
        {/* Header */}
        <Header link='/admin-options/ajustes-puntos' />
  
        <div className='my-5 mx-3'>
          <div className='row mx-auto d-flex flex-column gap-4'>

            <div>
              <p className='fs-3 fw-bold m-0 mb-2'>Titulo:</p>
              <input className='form-control rounded border-secondary' type="text" style={{height:35}} onChange={handleChangeNombre}/>
            </div>

            <div>
              <p className='fs-3 fw-bold m-0 mb-2'>Tamaño al visualizar:</p>
              <select className='form-control border-secondary' style={{height:35}} onChange={handleChangeSizeView}>
                <option selected value="small">Pequeño</option>
                <option value="normal">Normal</option>
                <option value="big">Grande</option>
              </select>
            </div>

            {/* <input type="text" className='col-12 border-1 fs-3 p-3' placeholder='Nombre de la nueva Categoria' onChange={handleChangeNombre} /> */}
  
            <div>
              <p className='fs-3 fw-bold m-0 mb-2'>Imagen:</p>
              <div className='d-flex justify-content-center align-items-center' style={{width:'100%', height:200, border: 'dashed green 2px'}} onClick={handleClickImg}>
                <BsCloudUploadFill className='text-success' style={{fontSize:100}} />
              </div>
              <input id='select-img' accept='image/*' type="file" hidden onChange={handleChangeSelectImg} />
            </div>
  
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="handleChangeCheckedViewInHome" defaultChecked onChange={handleChangeCheckedViewInHome} />
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
    );
  }
}


export default CreateCategory
