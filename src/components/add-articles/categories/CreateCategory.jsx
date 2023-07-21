import React, { useContext, useState } from 'react';

// React-Icons
import { BsCloudUploadFill } from 'react-icons/bs';

// uuid
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { createCategories } from '../../../firebase/firebaseFirestore';
import { uploadImage } from '../../../firebase/firebaseStorage';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Header
import Header from './components/Header';

// React-Toaster
import { ToastContainer, toast } from 'react-toastify';

// Context
import { AppContext } from '../../../context/AppContext';
import Swal from 'sweetalert2';

const CreateCategory = () => {

  const navigate = useNavigate();

  const { setCategorySelected } = useContext(AppContext);
  
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [sizeView, setSizeView] = useState('normal');
  const [imgCategory, setImgCategory] = useState(null);
  const [viewInHome, setViewInHome] = useState(false);
  const [viewInMenu, setViewInMenu] = useState(true);
  
  const [showBottonToBack, setShowBottonToBack] = useState(false);

  const handleChangeNombre = (e) => setNombreCategoria(e.target.value);
  const handleChangeSizeView = (e) => setSizeView(e.target.value);
  const handleChangeCheckedViewInHome = (e) => setViewInHome(e.target.checked);
  const handleChangeCheckedViewInMenu = (e) => setViewInMenu(e.target.checked);

  const handleClickImg = () => document.querySelector('#select-img').click();
  const handleChangeSelectImg = (e) => setImgCategory(e.target.files[0]);

  const [timeoutId, setTimeoutId] = useState(null);

  const handleClickAddArticle = async () => {
    if(nombreCategoria.length < 3) {
      Swal.fire({
        title: 'Advertencia',
        text:'El nombre de la categoria debe de tener por lo menos 3 caracteres', 
      });
      return;
    } else if(imgCategory == null) {
      Swal.fire({
        title: 'Advertencia',
        text:'Debes de seleccionar una imagen', 
      });
      return;
    }
  
    const id = uuidv4();
    const categoryInfo = {
      id: id, 
      nombreCategoria: nombreCategoria, 
      sizeView: sizeView,
      viewInHome: viewInHome, 
      viewInMenu:viewInMenu,
      imgpath: `imagenes/${id}`,
      isCategoryOfPoints: false, 
    }

    const createCategoryPromise = new Promise( async (resolve, reject) => {
      console.log('-----');
      const res = await createCategories(categoryInfo);
      const resImg = await uploadImage(id, imgCategory);
      if(res == true && resImg == true) {
        resolve('bien');
        setShowBottonToBack(true);
        const timeoutId = setTimeout( () => {
          navigate('/view-categories');
        }, 5000);
        setTimeoutId(timeoutId);
      }else {
        reject('mal');
        setShowBottonToBack(true);
        const timeoutId = setTimeout( () => {
        navigate('/view-categories');
        }, 5000);
        setTimeoutId(timeoutId);
      }
    })

    toast.promise( createCategoryPromise, {
      pending: 'Creando Categoria',
      success: 'Categoria Creada',
      error: 'Ha ocurrido un error al crear la categoria'
    });

  }

  const handleClickAtras = () => {
    setCategorySelected(null);
    clearTimeout(timeoutId);
    navigate('/view-categories');
  }

  return (
    <section className='border-0 border-bottom border-top' >
      {/* Header */}
      <Header handleClickAtras={handleClickAtras} />

      <div className='my-5 mx-3'>
        <div className='row mx-auto d-flex flex-column gap-4'>

          <div>
            <p className='fs-3 fw-bold m-0 mb-2'>Titulo:</p>
            <input className='form-control rounded border-secondary' type="text" style={{height:35}} onChange={handleChangeNombre}/>
          </div>

          {/* <input type="text" className='col-12 border-1 fs-3 p-3' placeholder='Nombre de la nueva Categoria' onChange={handleChangeNombre} /> */}

          <div>
            <p className='fs-3 fw-bold m-0 mb-2'>Tamaño al visualizar:</p>
            <select defaultValue='normal' className='form-control border-secondary' style={{height:35}} onChange={handleChangeSizeView}>
              <option value="small">Pequeño</option>
              <option  value="normal">Normal</option>
              <option value="big">Gande</option>
            </select>
          </div>

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

        { !showBottonToBack 
          ? <button className='btn form-control btn-success mt-5 p-2 fs-3' onClick={handleClickAddArticle}>Crear Categoria</button>
          : <button className='btn form-control btn-success mt-5 p-2 fs-3' onClick={handleClickAtras}>Salir</button>
        }

      
      </div>
      <ToastContainer />
    </section>
  )
}


export default CreateCategory
