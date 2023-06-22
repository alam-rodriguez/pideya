import React, { useContext, useEffect, useState } from 'react';

// React-Icons
import { BsCloudUploadFill } from 'react-icons/bs';

// uuid
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { createArticleOfPoints, updateArticleOfPoints } from '../../../../firebase/firebaseFirestore';
import { uploadImage } from '../../../../firebase/firebaseStorage';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Header
import Header from '../ajustes-puntos-componentes/Header';

// Context
import { AppContext } from '../../../../context/AppContext';
import { getUrlImage } from '../../../../firebase/firebaseStorage';

const CreateOrEditArticlePuntos = () => {
  const navigate = useNavigate();

  const { categorySelected, articleSelected, setArticleSelected } = useContext(AppContext);

  useEffect( () => {
    if(articleSelected != null){
      console.log(articleSelected);
      setTitulo(articleSelected.titulo);
      setSubtitulo(articleSelected.subtitulo);
      setPuntos(articleSelected.puntos);
      const f = async () => {
        const imgLink = await getUrlImage(articleSelected.imgpath);
        if(imgLink != false) setImgLink(imgLink);
      }
      f();
    }
  }, [] );

  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [precio, setPrecio] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [img, setImg] = useState(null);

  const [imgLink, setImgLink] = useState(null);

  const handleChangeTitulo = (e) => setTitulo(e.target.value);
  const handleChangeSubtitulo = (e) => setSubtitulo(e.target.value);
  const handleChangePuntos = (e) => setPuntos(e.target.value);

  const handleClickImg = () => document.querySelector('#select-img').click();

  const handleChangeSelectImg = (e) => setImg(e.target.files[0]);

  const handleClickCrearArticulo = async () => {

    if( titulo.length > 2 && subtitulo.length > 3 && img != null){
      const id = uuidv4();
      const info = {
        titulo: titulo,
        subtitulo: subtitulo,
        categoria: categorySelected.id,
        img: `imagenes/${id}`,
        disponible: true,
        complex: false,
        puntos: puntos,
      }
      console.log(info)
      const res = await createArticleOfPoints(id, info);      
      const resImg = await uploadImage(id, img);
      if(res == true && resImg == true) navigate('/admin-options/ajustes-puntos/view-articles');
      
      console.log(res);
    }else if(titulo.length < 2) {
      alert('El titulo debe de tener por lo menos 3 caracteres');
    }else if(img == null){
      alert('Debe de ingresar una imagen para el articulo');
    }

  }

  const handleClickAptualizarArticulo = async () => {
    if( titulo.length > 2 && subtitulo.length > 3){
      const info = {
        id: articleSelected.id,
        titulo: titulo,
        subtitulo: subtitulo,        
        disponible: true,
        puntos: puntos,
      }
      console.log(info)
      const res = await updateArticleOfPoints(info);
      if(img != null){
        const resImg = await uploadImage(info.id, img);
        if(res == true && resImg == true) navigate('/admin-options/ajustes-puntos/view-articles');
      }
      if(res == true) navigate('/admin-options/ajustes-puntos/view-articles');
      console.log(res);

    }else if(titulo.length < 2) {
      alert('El titulo debe de tener por lo menos 3 caracteres');
    }else if(img == null){
      alert('Debe de ingresar una imagen para el articulo');
    }
  }

  if(articleSelected == null){
    return (
      <main className='border-0 border-bottom border-top mx-3 col-11 col-sm-8 col-md-6 col-lg-6 mx-auto' style={{}} >
        {/* Header */}
        <Header link='/admin-options/ajustes-puntos/view-articles' />
  
        <section className='d-flex flex-column gap-4'>
  
          <div>
            <p className='fs-3 fw-bold m-0 mb-2'>Titulo:</p>
            <input className='form-control rounded border-secondary' type="text" style={{height:35}} value={titulo} onChange={handleChangeTitulo}/>
          </div>
          <div>
            <p className='fs-3 fw-bold m-0 mb-2'>Subtitulo:</p>
            <textarea className='form-control border-secondary' name="" id="" style={{minHeight:35, maxHeight:200}} value={subtitulo} onChange={handleChangeSubtitulo}></textarea>
          </div>
  
          <div>
            <p className='fs-3 fw-bold m-0 mb-2'>Puntos:</p>
            <input className='form-control rounded border-secondary' type="number" style={{height:35}} placeholder='Precio del producto' value={puntos} onChange={handleChangePuntos}/>
          </div>
  
          <div>
            <p className='fs-3 fw-bold m-0 mb-2'>Imagen:</p>
            <div className='d-flex justify-content-center align-items-center' style={{width:'100%', height:200, border: 'dashed green 2px'}} onClick={handleClickImg}>
              <BsCloudUploadFill className='text-success' style={{fontSize:100}} />
            </div>
            <input id='select-img' accept='image/*' type="file" hidden onChange={handleChangeSelectImg} />
          </div>
  
          <input className='btn btn-success fs-3 rounded-0' type="button" value='Crear Articulo' onClick={handleClickCrearArticulo}/>
  
        </section>
      </main>
    );
  }else {
    return (
      <main className='border-0 border-bottom border-top mx-3 col-11 col-sm-8 col-md-6 col-lg-6 mx-auto' style={{}} >
        {/* Header */}
        <Header link='/admin-options/ajustes-puntos/view-articles' />
  
        <section className='d-flex flex-column gap-4'>
  
          <div>
            <p className='fs-3 fw-bold m-0 mb-2'>Titulo:</p>
            <input className='form-control rounded border-secondary' type="text" style={{height:35}} value={titulo} onChange={handleChangeTitulo}/>
          </div>
          <div>
            <p className='fs-3 fw-bold m-0 mb-2'>Subtitulo:</p>
            <textarea className='form-control border-secondary' name="" id="" style={{minHeight:35, maxHeight:200}} value={subtitulo} onChange={handleChangeSubtitulo}></textarea>
          </div>
  
          <div>
            <p className='fs-3 fw-bold m-0 mb-2'>Puntos:</p>
            <input className='form-control rounded border-secondary' type="number" style={{height:35}} placeholder='Precio del producto' value={puntos} onChange={handleChangePuntos}/>
          </div>
  
          <div>
            <p className='fs-3 fw-bold m-0 mb-2'>Imagen:</p>
            <div className='d-flex justify-content-center align-items-center p-4 rounded-5' style={{width:'100%', height:200, border: 'dashed green 2px'}} onClick={handleClickImg}>
              { imgLink == null ?
                <div className="spinner-border text-success fs-2" role="status" style={{height:50, width:50}}>
                  <span className="visually-hidden">Loading...</span>
                </div>
              : <img src={imgLink} className='w-100 h-100 object-fit-cover rounded-5' />  
              }
            </div>
            <input id='select-img' accept='image/*' type="file" hidden onChange={handleChangeSelectImg} />
          </div>
  
          <input className='btn btn-success fs-3 rounded-0' type="button" value='Aptualizar Articulo' onClick={handleClickAptualizarArticulo}/>
  
        </section>
      </main>
    );
  }
}


export default CreateOrEditArticlePuntos;