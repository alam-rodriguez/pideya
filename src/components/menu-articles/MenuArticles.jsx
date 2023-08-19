import React, { useContext, useEffect, useState } from 'react';

// Context
import { AppContext } from '../../context/AppContext';

// Firebase
import { getAllCategories, getArticlesByCategory, getCategoriesFilted, getEstadisticas, obtenerInfoApp } from '../../firebase/firebaseFirestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Components
import MenuHeader from './menu-components/MenuHeader';
import MenuViewCategories from './menu-components/MenuViewCategories';
import MenuViewArticles from './menu-components/MenuViewArticles';
import PreviewInfoArticle from './menu-components/PreviewInfoArticle';
import OrderSelectArticle from './menu-components/OrderSelectArticle';
import CartPreview from './menu-components/cart/CartPreview';
import Cart from './menu-components/cart/Cart';

// Toaster
import { ToastContainer } from 'react-toastify';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';
import { getImagesFromFolder, getImagesFromFolderForHome } from '../../firebase/firebaseStorage';

const MenuArticles = () => {

  const navigate = useNavigate();

  const { email, categories, setCategories, categoriesOfMenu, setCategoriesOfMenu, setEmail, categorySelected, cart, setCart, cartOfCategoryPoints, setCartOfCategoryPoints, infoPointsUser, setInfoPointsUser, amountPoints, setAmountPoints, infoPoints, setInfoPoints, estadisticasUser, setEstadisticasUser, setClientOrders, imagenesCategorias, setImagenesCategorias, imagenesArticulos, setImagenesArticulos, articlesOfHome, haEstadoEnMenu, setHaEstadoEnMenu, adminsTokens, setAdminsTokens } = useContext(AppContext)

  const [articlesOfCategorySelected, setArticlesOfCategorySelected] = useState(null);

  const [viewMenu, setViewMenu] = useState(0);

  const [viewPreviewInfoArticle, setViewPreviewInfoArticle] = useState(false);

  const [viewOrderSelectArticle, setViewOrderSelectArticle] = useState(false);

  const [viewCart, setViewCart] = useState(false);

  useEffect( () => {
    const f = async () => {
      if(infoPoints == null || adminsTokens.length == 0){
        const infoApp = await obtenerInfoApp();
        console.log(infoApp);
        setInfoPoints(infoApp.infoPoints);
        setAdminsTokens(infoApp.adminsTokens);
      }
    }
    f();
  }, [] );

  // Loguea al usuario si automaticamente
  useEffect( () => { 
    if(email == null){
      const auth = getAuth();
      onAuthStateChanged(auth, (user)  => {
        if(user != null) setEmail(user.email);
      });
    }
  }, [] );

  // obtener puntos de usuario
  // useEffect( () => {
  //   if(email != null && infoPointsUser == null){
  //     console.log('----');
  //     const f = async () => {
  //       const pointsUser = await getEstadisticas(email);
  //       if(pointsUser != 'no estadisticas' && pointsUser != false) {
  //         setAmountPoints( pointsUser.puntosRestantes );
  //         setInfoPointsUser(pointsUser);
  //       }
  //       console.log(pointsUser);
  //     }
  //     f();
  //   }
  // }, [email] );

  // Crea y obtiene estadisticas de usuarios
  // useEffect( () => {
  //   if(estadisticasUser == null){
  //     const f = async () => {
  //       const estadisticas = await getEstadisticas(email);
  //       console.log(estadisticas);
  //       if(estadisticas.dineroGastado != undefined) setEstadisticasUser(estadisticas);
  //       else if(estadisticas == 'no estadisticas'){
  //         const firstEstadisticas = {
  //           dineroGastado: 0,
  //           puntosGanados: 0,
  //           puntosGastados: 0,
  //           puntosRestantes: 0,
  //         }
  //         setEstadisticasUser(firstEstadisticas);
  //       }
  //     }
  //     f();
  //   }
  // }, [] );

  // useEffect( () => {
  //   const f = async () => {
  //     if(viewMenu == 0 ){
  //       const res = await getCategoriesFilted('viewInMenu');
  //       setCategories(res);
  //       console.log(res);
  //     }else if(viewMenu == 1){
  //       const res = await getArticlesByCategory(categorySelected.id);
  //       setArticlesOfCategorySelected(res);
  //     }
  //   }
  //   f();
  // }, [viewMenu] );

  // Obtener categorias
  useEffect( () => {
    if(categories == null && categoriesOfMenu == null && articlesOfHome == null){
      const getInfo = async () => {
        let categoryiesOfHome = [];
        let categoriesOfMenu = [];
        const categories = await getAllCategories('viewInHome');
        
        categories.forEach( (categoria) => {
          if(categoria.viewInHome) categoryiesOfHome.push(categoria);
          if(categoria.viewInMenu) categoriesOfMenu.push(categoria);
        });

        categoryiesOfHome.sort((a, b) => b.position - a.position);
        categoriesOfMenu.sort((a, b) => a.position - b.position);
        setCategories(categoryiesOfHome);
        setCategoriesOfMenu(categoriesOfMenu);


        // const imagesOfCategories = await getImagesFromFolder('imagenes-categorias');
        // setImagenesCategorias(imagesOfCategories);
        // console.warn('Cargaron categorias');  


        // let articles = [];
        // await Promise.all(categoryiesOfHome.map(async (category) => {
        //   let articlesOfCategory = await getArticlesByCategory(category.id);
        //   articlesOfCategory.forEach((article) => {
        //     articles.push(article.id);
        //   });
        // }));
        // let articlesOfHome = await getImagesFromFolderForHome('imagenes-articulos', articles);
        // setImagenesArticulos(articlesOfHome);
        
        // console.log(articlesOfHome);
        // console.warn('Debe de verse');

        
      }
      getInfo();
    }
  }, [] );

  // obtener articulos de cateoria seleccionada
  useEffect( () => {
    if(viewMenu == 1){
    const f = async () => {
        const res = await getArticlesByCategory(categorySelected.id);
        res.sort((a,b) => a.position - b.position);
        setArticlesOfCategorySelected(res);
      }
      f();
    }
  }, [viewMenu] );

  const resetCart = () => {
    setViewMenu(0);
    setViewPreviewInfoArticle(false);
    setViewOrderSelectArticle(false);
    setArticlesOfCategorySelected(null);
    setCartOfCategoryPoints([]);
    setCart([]);
    setViewCart(false);
    setClientOrders(null);
    setInfoPointsUser(null);
    navigate('/home');
  }


  const [viewSectionInHeader, setViewSectionInHeader] = useState(false);
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    if(scrollTop > 30) setViewSectionInHeader(true);
    else setViewSectionInHeader(false);
  };

  // Obtiene imagenes de articulos que no tengo
  // useEffect(() => {
  //   if(categorySelected == null || articlesOfCategorySelected == null || imagenesArticulos == null) return;
  //   const f = async () => {
  //     let articlesSinImagenes = [];
  //     articlesOfCategorySelected.forEach( (article) => {
  //       let imgPath = article.imgpath.split('/')[1];
  //       if(!imagenesArticulos.hasOwnProperty(imgPath)) articlesSinImagenes.push(imgPath);
  //     });
  //     if(articlesSinImagenes.length == 0) return;

  //     let articlesOfHome = await getImagesFromFolderForHome('imagenes-articulos', articlesSinImagenes);
  //     setImagenesArticulos(state => ({...state, ...articlesOfHome}));
  //   }
  //   f();
    
  // }, [categorySelected, articlesOfCategorySelected]);

  
  

  

  if(categoriesOfMenu != null){
    return (
      <main >
        
        <div className={`container d-flex flex-column flex-grow-1 col-12 col-md-6 mx-auto ${!haEstadoEnMenu ? 'animate__animated animate__fadeIn' : ''} z-3 px-3- vh-100- ${viewPreviewInfoArticle ? 'animate__animatedanimate__fadeIn z-0 bg-black bg-opacity-25 z-3' : ''}`} style={{maxHeight:'100vh'}}>
        <MenuHeader viewSectionInHeader={viewSectionInHeader} text={viewMenu == 0 ? 'Menu' : categorySelected.nombre} className='' viewMenu={viewMenu} setViewMenu={setViewMenu} setArticlesOfCategorySelected={setArticlesOfCategorySelected} viewPreviewInfoArticle={viewPreviewInfoArticle}/>
        
        <div className=' overflow-scroll bg-danger- px-3 top-0 start-0 ' style={{flex:'1', paddingBottom:60, marginTop:90}} onScroll={handleScroll}>

          {/* <div className={`position-absolute px-3 vh-100 vw-100 p-0 m-0 start-0 animate__animated animate__fadeIn z-0${viewPreviewInfoArticle ? 'bg-black bg-opacity-25' : ''}`}> */}
          {/* Header */}
          
          { viewMenu == 0 ? 
            <>
              <h2 className='fs-1 fw-bold'>Menu</h2>

              <div className='d-flex flex-wrap justify-content-between'>
                { categoriesOfMenu != null
                  ? categoriesOfMenu.map((category)=>{
                    // const path = category.imgpath.split('/')[1]; 
                    return <MenuViewCategories
                      key={category.id}
                      nombre={category.nombre}
                      imgPath={category.imgpath}
                      category={category}
                      setViewMenu={setViewMenu}
                    />
                  })
                  : <></>
                }
              </div>
            </>
          : viewMenu == 1 ?
            <>
              { viewPreviewInfoArticle
                ? 
                // <div className='animate__animated animate__fadeInUp vw-100 vh-100 position-absolute start-0 top-0 bg-black bg-opacity-25'>
                <PreviewInfoArticle setViewPreviewInfoArticle={setViewPreviewInfoArticle} setViewOrderSelectArticle={setViewOrderSelectArticle} />
                // {/* </div> */}
                : <></> 
              }
              { viewOrderSelectArticle
                ? <OrderSelectArticle setViewMenu={setViewMenu} setViewOrderSelectArticle={setViewOrderSelectArticle} articlesOfCategorySelected={articlesOfCategorySelected} />
                : <></>
              }
              <div >
                <h2 className='fs-1 fw-bold '>{categorySelected.nombre}</h2>
                    
                    <div className='d-flex flex-wrap justify-content-between'>
                      { articlesOfCategorySelected != null
                        ? articlesOfCategorySelected.map((articulo)=>{
                          const path = articulo.imgpath.split('/')[1];
                          return <MenuViewArticles
                            key={articulo.id}
                            id={articulo.id}
                            titulo={articulo.titulo}
                            imgPath={articulo.imgpath}
                            articulo={articulo}
                            setViewPreviewInfoArticle={setViewPreviewInfoArticle}
                          />
                        })
                      : <></>
                      }
                </div>
              </div>
            </>
          : <></>
          }

          { ((cart.length > 0 || cartOfCategoryPoints.length > 0) && (!viewOrderSelectArticle) ) 
            ? <CartPreview setViewCart={setViewCart} />
            : <></>
          }

          { viewCart 
            ? <Cart setViewCart={setViewCart} setViewMenu={setViewMenu} resetCart={resetCart} />
            : <></>
          }
          {/* </div> */}

          <ToastContainer />

        </div>
        </div>

      </main>
    );
  }else {
    return(
      <main className='d-flex justify-content-center align-items-center vh-100'>
        <div className="spinner-border text-success fs-2" role="status" style={{height:50, width:50}}>
          <span className="visually-hidden">Loading...</span>
        </div> 
      </main>
    );
  }
}

export default MenuArticles

