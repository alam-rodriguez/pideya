import React, { useEffect, useState } from 'react';

// React-Icons
import { MdPlaylistAddCheckCircle } from 'react-icons/md';
import { BsCloudUploadFill } from 'react-icons/bs';

// uuid
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { createArticle, getCategories } from '../../../firebase/firebaseFirestore';
import { uploadImage } from '../../../firebase/firebaseStorage';
// import { createArticle, createCategories } from '../../firebase/firebaseFirestore';
// import { uploadImage } from '../../firebase/firebaseStorage';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Header
import CreateArticleHeader from '../sections/CreateArticleHeader';
// import CreateArticleHeader from './sections/CreateArticleHeader';
// import CreateArticleHeader from './CreateArticleHeader';

const ViewCategories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState(null);

  useEffect( () => {
    const f = async () => { 
      const res = await getCategories();
      setCategories(res);
    }
    f();
  }, [] );

  // const [titulo, setTitulo] = useState('');
  // const [subtitulo, setSubtitulo] = useState('');
  // const [img, setImg] = useState(null);

  // const [nombreCategoria, setNombreCategoria] = useState('');

  // const handleChangeTitulo = (e) => setTitulo(e.target.value);
  // const handleChangeSubtitulo = (e) => setSubtitulo(e.target.value);

  // const handleClickImg = () => document.querySelector('#select-img').click();

  // const handleChangeSelectImg = (e) => setImg(e.target.files[0]);

  // const handleClickCrearArticulo = async () => {

  //   if( titulo.length > 3 && subtitulo.length > 3 && img != null){
  //     const id = uuidv4();
  //     const info = {
  //       titulo: titulo,
  //       subtitulo: subtitulo,
  //       img: `imagenes/${id}`,
  //     }
  //     console.log(img)
  //     const res = await createArticle(id, info);
  //     const resImg = await uploadImage(id, img);
  //     if(res == true && resImg == true){
  //       console.log('bien');
  //     }
  //     // console.log(info);

  //   }else {
  //     console.log('no')
  //   }

  // }

  // const handleChangeNombre = (e) => setNombreCategoria(e.target.value);

  const handleClickAddArticle = async () => {
    // if(nombreCategoria.length > 3){
    //   await createCategories(uuidv4(), nombreCategoria);
    // }
  }

  const handleClickAtras = () => navigate('/add-article');

  // handles
  const handleClickCrearCategoria = () => navigate('/create-categories');

  return (
    <main className='border-0 border-bottom border-top mx-3' >
      {/* Header */}
      <CreateArticleHeader path='/admin-options' />

      <section className='d-flex flex-column gap-4'>

        { categories != null 
          ? categories.map((category)=>(
            <div key={category.id}>
              <p>{category.nombre}</p>
            </div>
          ))
        : <></>}

        <button className='btn form-control btn-success fs-3 position-absolute bottom-0 start-50 mb-4 translate-middle rounded-0' onClick={handleClickCrearCategoria}>Crear Categoria</button>

      </section>
    </main>
  )
}


export default ViewCategories;