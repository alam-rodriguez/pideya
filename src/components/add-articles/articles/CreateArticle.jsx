import React, { useEffect, useState } from 'react';

// React-Icons
import { MdPlaylistAddCheckCircle } from 'react-icons/md';
import { BsCloudUploadFill } from 'react-icons/bs';

// uuid
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { createArticle, createCategories, getCategories } from '../../../firebase/firebaseFirestore';
import { uploadImage } from '../../../firebase/firebaseStorage';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Header
import CreateArticleHeader from '../sections/CreateArticleHeader';
// import CreateArticleHeader from './CreateArticleHeader';

const CreateArticle = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState(null);

  useEffect( () => {
    const f = async () => {
      const res = await getCategories();
      setCategories(res);
    }
    f();
  }, [] );

  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [articuloCategoria, setArticuloCategoria] = useState('sin categoria');
  const [precio, setPrecio] = useState(0);
  const [img, setImg] = useState(null);

  // const [nombreCategoria, setNombreCategoria] = useState('');

  const handleChangeTitulo = (e) => setTitulo(e.target.value);
  const handleChangeSubtitulo = (e) => setSubtitulo(e.target.value);
  const handleChangeCategoria = (e) => setArticuloCategoria(e.target.value);
  const handleChangePrecio = (e) => setPrecio(e.target.value);

  const handleClickImg = () => document.querySelector('#select-img').click();

  const handleChangeSelectImg = (e) => setImg(e.target.files[0]);

  const handleClickCrearArticulo = async () => {

    if( titulo.length > 3 && subtitulo.length > 3 && img != null){
      const id = uuidv4();
      const info = {
        titulo: titulo,
        subtitulo: subtitulo,
        categoria: articuloCategoria,
        precio: precio,
        disponible: true,
        img: `imagenes/${id}`,
      }
      // console.log(img);
      const res = await createArticle(id, info);
      const resImg = await uploadImage(id, img);
      console.log(res)
      if(res == true && resImg == true){
        navigate('/view-articles');
      }
      // console.log(info);
    }else {
      console.log('no')
    }
  }

  return (
    <main className='border-0 border-bottom border-top mx-3' >
      {/* Header */}
      <CreateArticleHeader path='/view-articles' />

      <section className='d-flex flex-column gap-4'>

        <div>
          <p className='fs-3 fw-bold m-0 mb-2'>Titulo:</p>
          <input className='form-control rounded border-secondary' type="text" style={{height:35}} onChange={handleChangeTitulo}/>
        </div>
        <div>
          <p className='fs-3 fw-bold m-0 mb-2'>Subtitulo:</p>
          <textarea className='form-control border-secondary' name="" id="" style={{minHeight:35, maxHeight:200}} onChange={handleChangeSubtitulo}></textarea>
          {/* <input className='input-group' type="text" style={{height:50}} onChange={handleChangeSubtitulo} /> */}
        </div>

        <div>
          <p className='fs-3 fw-bold m-0 mb-2'>Categoria:</p>
          <select className='form-control border-secondary' style={{height:35}} onChange={handleChangeCategoria}>
            <option value="sin categoria">Sin categoria</option>
            { categories != null 
              ? categories.map((category)=>(
                <option key={category.id} value={category.id}>{category.nombre}</option>
              ))
              : <option value=""></option>
            }
          </select>
        </div>

        <div>
          <p className='fs-3 fw-bold m-0 mb-2'>Precio:</p>
          <input className='form-control rounded border-secondary' type="number" style={{height:35}} placeholder='Precio del producto' onChange={handleChangePrecio}/>
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