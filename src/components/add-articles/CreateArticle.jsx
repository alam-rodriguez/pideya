import React, { useState } from 'react';

// React-Icons
import { MdPlaylistAddCheckCircle } from 'react-icons/md';
import { BsCloudUploadFill } from 'react-icons/bs';

// uuid
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { createArticle, createCategories } from '../../firebase/firebaseFirestore';
import { uploadImage } from '../../firebase/firebaseStorage';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Header
import CreateArticleHeader from './sections/CreateArticleHeader';
// import CreateArticleHeader from './CreateArticleHeader';

const CreateArticle = () => {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [img, setImg] = useState(null);

  // const [nombreCategoria, setNombreCategoria] = useState('');

  const handleChangeTitulo = (e) => setTitulo(e.target.value);
  const handleChangeSubtitulo = (e) => setSubtitulo(e.target.value);

  const handleClickImg = () => document.querySelector('#select-img').click();

  const handleChangeSelectImg = (e) => setImg(e.target.files[0]);

  const handleClickCrearArticulo = async () => {

    if( titulo.length > 3 && subtitulo.length > 3 && img != null){
      const id = uuidv4();
      const info = {
        titulo: titulo,
        subtitulo: subtitulo,
        img: `imagenes/${id}`,
      }
      console.log(img)
      const res = await createArticle(id, info);
      const resImg = await uploadImage(id, img);
      if(res == true && resImg == true){
        console.log('bien');
      }
      // console.log(info);

    }else {
      console.log('no')
    }

    // console.log(titulo);
    // console.log(subtitulo);
    // console.log(img);
  }

  // const handleChangeNombre = (e) => setNombreCategoria(e.target.value);

  const handleClickAddArticle = async () => {
    // if(nombreCategoria.length > 3){
    //   await createCategories(uuidv4(), nombreCategoria);
    // }
  }

  const handleClickAtras = () => navigate('/add-article');

  return (
    <main className='border-0 border-bottom border-top mx-3' >
      {/* Header */}
      <CreateArticleHeader path='/view-articles' />

      <section className='d-flex flex-column gap-4'>

        <div>
          <p className='fs-3 fw-bold m-0 mb-2'>Titulo:</p>
          <input className='input-group' type="text" style={{height:35}} onChange={handleChangeTitulo}/>
        </div>
        <div>
          <p className='fs-3 fw-bold m-0 mb-2'>Subtitulo:</p>
          <input className='input-group' type="text" style={{height:50}} onChange={handleChangeSubtitulo} />
        </div>

        <div>
          <p className='fs-3 fw-bold m-0 mb-2'>Imagen:</p>
          <div className='d-flex justify-content-center align-items-center' style={{width:'100%', height:200, border: 'dashed green 2px'}} onClick={handleClickImg}>
            <BsCloudUploadFill className='text-success' style={{fontSize:100}} />
          </div>
          <input id='select-img' accept='image/*' type="file" hidden onChange={handleChangeSelectImg} />
        </div>

        <input className='btn btn-success fs-3 position-absolute bottom-0 start-50 w-100 translate-middle mb-4' type="button" value='Crear Articulo' onClick={handleClickCrearArticulo}/>

      </section>
    </main>
  )
}


export default CreateArticle;