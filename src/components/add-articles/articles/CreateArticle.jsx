import React, { useEffect, useState } from 'react';

// React-Icons
import { BsCloudUploadFill, BsDashLg, BsPlusCircle } from 'react-icons/bs';
import { GrSubtractCircle } from 'react-icons/gr'

// uuid
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { createArticle, createCategories, getCategories } from '../../../firebase/firebaseFirestore';
import { uploadImage } from '../../../firebase/firebaseStorage';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Header
import CreateArticleHeader from '../sections/CreateArticleHeader';

const CreateArticle = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState(null);

  // Para poner si sera un articulo complejo o no
  const [complejo, setComplejo] = useState(false);

  // Para crear lista de inputs de ariantes
  const [variantes, SetVariantes] = useState([0]);
  const [variantePrecio, setVariantePrecio] = useState([0]);

  const [adicionalesYPrecios, setAdicionalesYPrecios] = useState([0]);

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
  const [infoArticleComplex, setInfoArticleComplex] = useState([]);

  const handleChangeTitulo = (e) => setTitulo(e.target.value);
  const handleChangeSubtitulo = (e) => setSubtitulo(e.target.value);
  const handleChangeCategoria = (e) => setArticuloCategoria(e.target.value);
  const handleChangePrecio = (e) => setPrecio(e.target.value);

  const handleClickImg = () => document.querySelector('#select-img').click();

  
  const handleChangeSelectImg = (e) => setImg(e.target.files[0]);

  const handleClickCrearArticulo = async () => {

    let infoArticleComplex = [];

    variantes.map((variante)=>{
      // const obj = {};
      // const size = document.querySelector(`.variante-nombre-${variante}`);
      // const nombresIngredientes = document.querySelectorAll(`#variante-nombre-${variante} .ingrediente-nombre`);
      // const preciosIngredientes = document.querySelectorAll(`#variante-nombre-${variante} .ingrediente-precio`); 
      // const objIngredientesAndPrecio = {};
      // nombresIngredientes.forEach((nombreIngrediente)=>{
      //   objIngredientesAndPrecio[nombreIngrediente.value] = 0;
      //   // console.log(nombreIngrediente.value);
      // });
      // let arrayOfNombresIngredientes = Object.entries(objIngredientesAndPrecio);
      // preciosIngredientes.forEach((precioIngrediente, i)=>{
      //   arrayOfNombresIngredientes[i][1] = precioIngrediente.value;
      //   // console.log(newArray);
      // });
      // const objIngredientesAndPrecioFinal = Object.fromEntries(arrayOfNombresIngredientes);
      // console.log(objIngredientesAndPrecioFinal);


      // 2

      const size = document.querySelector(`.variante-nombre-${variante}`);
      const sizePrice = document.querySelector(`.variante-precio-${variante}`);

      console.log(size);
      console.log(sizePrice);

      if(size != null && sizePrice != null){
        // <input className={`col-12 variante-nombre variante-nombre-${i}`} type="text" placeholder='Variante...' />

        const nombresAdicionales = document.querySelectorAll(`#variante-nombre-${variante} .adicional-nombre`);
        const preciosAdicionales = document.querySelectorAll(`#variante-nombre-${variante} .adicional-precio`);
        const canBeMiddle = document.querySelectorAll(`#variante-nombre-${variante} .form-check-input`); 
        const objAdicionalesAndPrecio = {};
        nombresAdicionales.forEach((nombreAdicional, i)=>{
          
          objAdicionalesAndPrecio[nombreAdicional.value] = 0;
       

          // console.log(nombreIngrediente.value);
        });
        let arrayOfNombresAdicionales = Object.entries(objAdicionalesAndPrecio);
        preciosAdicionales.forEach((precioAdicional, i)=>{
          arrayOfNombresAdicionales[i][1] = {
            precio: precioAdicional.value,
            isMiddle: canBeMiddle[i].checked,
          };

          // arrayOfNombresAdicionales[i][2] = canBeMiddle[i].checked;
          // console.log(newArray);
        });
        const objAdicionalesAndPrecioFinal = Object.fromEntries(arrayOfNombresAdicionales);
        // console.log(objIngredientesAndPrecioFinal);

        const obj = {
          sizeArticle: size.value,
          sizeArticlePrice: sizePrice.value,
          adicionales: objAdicionalesAndPrecioFinal,
        }

        // obj[size.value] = {
        //   // ingredientes: objIngredientesAndPrecioFinal,
        //   adicionales: objAdicionalesAndPrecioFinal,
        // };

        // obj[size.value] = objAdicionalesAndPrecioFinal;
        // console.log(obj);

        // console.log(obj);

        infoArticleComplex.push(obj);
      }
    })

    // console.log(infoArticleComplex);

    if( titulo.length > 3 && subtitulo.length > 3 && img != null){
      // let isArticleComplex = false;
      // if(infoArticleComplex.length >= 0)isArticleComplex = true;
      const id = uuidv4();
      const info = {
        titulo: titulo,
        subtitulo: subtitulo,
        categoria: articuloCategoria,
        img: `imagenes/${id}`,
        disponible: true,
        complex: complejo,
        precios: complejo ? infoArticleComplex : precio,
      }
      console.log(info)
      const res = await createArticle(id, info);
      const resImg = await uploadImage(id, img);
      console.log(res)
      if(res == true && resImg == true){
        navigate('/view-articles');
      }

    } else {
      console.log('no')
    }

  }

  const handleChangeChecked = (e) => {
    // console.log(e.target.checked);
    setComplejo(e.target.checked);
  }

  // Agregar nueva variante
  const handleClickAddVariante = () => SetVariantes(state => ([...state, state.length]));
  const handleClickRemoveVariante = () => {
    const nuevoArray = variantes.slice(0, variantes.length - 1);
    SetVariantes(nuevoArray);
  };

  // Agregar nuevo precio en variante
  const handleClickAddPrice = () => setVariantePrecio(state => ([...state, 0]));
  const handleClickRemovePrice  = () => {
    const nuevoArray = variantePrecio.slice(0, variantePrecio.length - 1);
    setVariantePrecio(nuevoArray);
  }

  // Agregar adicional en variante
  const handleClickAddPriceAdicional = () => setAdicionalesYPrecios(state => ([...state, 0]));
  const handleClickRemovePriceAdicional  = () => {
    const nuevoArray = adicionalesYPrecios.slice(0, adicionalesYPrecios.length - 1);
    setAdicionalesYPrecios(nuevoArray);
  }

  return (
    <main className='border-0 border-bottom border-top mx-3 col-11 col-sm-8 col-md-6 col-lg-6 mx-auto' style={{}} >
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

        { !complejo ? 
          <div>
            <p className='fs-3 fw-bold m-0 mb-2'>Precio:</p>
            <input className='form-control rounded border-secondary' type="number" style={{height:35}} placeholder='Precio del producto' onChange={handleChangePrecio}/>
          </div>
          : <></>
        }

        <div>
          <p className='fs-3 fw-bold m-0 mb-2'>Imagen:</p>
          <div className='d-flex justify-content-center align-items-center' style={{width:'100%', height:200, border: 'dashed green 2px'}} onClick={handleClickImg}>
            <BsCloudUploadFill className='text-success' style={{fontSize:100}} />
          </div>
          <input id='select-img' accept='image/*' type="file" hidden onChange={handleChangeSelectImg} />
        </div>

        { complejo ? 
          variantes.map((precio, i)=>(
            // <div className='row' key={i}>
            //   {/* <GrSubtractCircle className='display-3 col-2' /> */}
            //   <input className='col-8 border border-secondary rounded' type="text" placeholder='Precio 1'/>
            //   {/* <BsPlusCircle className='display-3 col-2' onClick={handleClickAddPrice}/> */}
            //   <div className='row col-9 mx-auto'>
            //     <GrSubtractCircle className='display-3 col-2' />
            //     <input className='col-8 border border-secondary rounded' type="text" placeholder='Precio 1'/>
            //     <BsPlusCircle className='display-3 col-2' onClick={handleClickAddPrice}/>
            //   </div>
            // </div>
            <div key={i} className="accordion" id='accordionExample'>
              <div className="accordion-item">
                <h2  className="accordion-header">
                  <button  className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="true" aria-controls="collapseOne">
                    Accordion Item #1
                  </button>
                </h2>
                <div id={`collapse${i}`}  className="accordion-collapse collapse show" data-bs-parent='#accordionExample'>
                  <p className='m-0'>Tamaño del articulo:</p>
                  <div  className="accordion-body">
                    <div className='row'>
                      <input className={`col-6 variante-nombre variante-nombre-${i}`} type="text" placeholder='Tamano...' />
                      <input className={`col-6 variante-nombre variante-precio-${i}`} type="text" placeholder='Precio...' />
                    </div>

                    {/* Nombre y precio de ingredientes segun el size */}
                    {/* <p className='m-0 mt-5'>Nombre del ingrediente y precio:</p>
                    <div id={`variante-nombre-${i}`}>
                      {variantePrecio.map((variantePrecio, i)=>(
                        <div key={i} className='row my-2'>
                          <input className={`col-6 ingrediente-nombre`}  type="text" placeholder='Nombre...' />
                          <input className='col-6 ingrediente-precio' type="text" placeholder='Precio...' />
                        </div>
                      ))}
                    </div>
                    <div className=' d-flex justify-content-between mt-4'>
                      <GrSubtractCircle className='display-6' onClick={handleClickRemovePrice} />
                      <BsPlusCircle className='display-6' onClick={handleClickAddPrice}/>
                    </div> */}
                        
                    {/* Ingrediente adicional y precio segun el size */}
                    <p className='m-0 mt-5'>Ingrediente adicional y precio:</p>
                    <div id={`variante-nombre-${i}`}>
                      {adicionalesYPrecios.map((variantePrecio, i)=>(
                        <div key={i} className='row my-2'>
                          <input className='col-6 adicional-nombre'  type="text" placeholder='Nombre...' />
                          <input className='col-4 adicional-precio' type="text" placeholder='Precio...' />
                          <div className="form-check form-switch col-1 d-flex justify-content-center align-items-center">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"  defaultChecked/>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className=' d-flex justify-content-between mt-4'>
                      <GrSubtractCircle className='display-6' onClick={handleClickRemovePriceAdicional} />
                      <BsPlusCircle className='display-6' onClick={handleClickAddPriceAdicional}/>
                    </div>
                    {/* <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. */}
                  </div>
                </div>
              </div>
            </div>
          ))
          : <></>
        }

        { complejo ?
          <div className='d-flex justify-content-between' >
              <GrSubtractCircle className='display-3' onClick={handleClickRemoveVariante} />
              {/* <input className='col-8 border border-secondary rounded' type="text" placeholder='Precio 1'/> */}
              <BsPlusCircle className='display-3' onClick={handleClickAddVariante}/>
              {/* <div className='row col-9 mx-auto'>
                <GrSubtractCircle className='display-3 col-2' />
                <input className='col-8 border border-secondary rounded' type="text" placeholder='Precio 1'/>
                <BsPlusCircle className='display-3 col-2' onClick={handleClickAddPrice}/>
              </div> */}
            </div> 
          : <></>
        }

        {/* Cambiar complejidad */}
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="handleChangeChecked" onChange={handleChangeChecked} />
          <label className="form-check-label" htmlFor="handleChangeChecked">Deseas que esta categoria se muestre en el menu de la app ?</label>
        </div>


        {/* <input className='btn btn-success fs-3 position-absolute bottom-0 start-50 w-100 translate-middle mb-4 rounded-0' type="button" value='Crear Articulo' onClick={handleClickCrearArticulo}/> */}
        <input className='btn btn-success fs-3 rounded-0' type="button" value='Crear Articulo' onClick={handleClickCrearArticulo}/>


      </section>
    </main>
  )
}


export default CreateArticle;