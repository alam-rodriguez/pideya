import React, { useContext, useEffect, useState } from 'react';

// Context
import { AppContext } from '../../context/AppContext';

// Firebase
import { getArticlesByCategory, getCategoriesFilted, getEstadisticas, obtenerInfoApp } from '../../firebase/firebaseFirestore';
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

const MenuArticles = () => {

  const { email, categories, setCategories, categoriesOfMenu, setCategoriesOfMenu, setEmail, categorySelected, cart, setCart, cartOfCategoryPoints, setCartOfCategoryPoints, infoPointsUser, setInfoPointsUser, amountPoints, setAmountPoints, infoPoints, setInfoPoints, estadisticasUser, setEstadisticasUser } = useContext(AppContext)

  const [articlesOfCategorySelected, setArticlesOfCategorySelected] = useState(null);

  const [viewMenu, setViewMenu] = useState(0);

  const [viewPreviewInfoArticle, setViewPreviewInfoArticle] = useState(false);

  const [viewOrderSelectArticle, setViewOrderSelectArticle] = useState(false);

  const [viewCart, setViewCart] = useState(false);

  useEffect( () => {
    const f = async () => {
      if(infoPoints == null){
        const infoPointsApp = await obtenerInfoApp();
        console.log(infoPointsApp.infoPoints);
        setInfoPoints(infoPointsApp.infoPoints);
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
  useEffect( () => {
    const f = async () => {
      if(categoriesOfMenu == null){
        const res = await getCategoriesFilted('viewInMenu');
        setCategoriesOfMenu(res);  
      }
      if(viewMenu == 1){
        const res = await getArticlesByCategory(categorySelected.id);
        setArticlesOfCategorySelected(res);
      }
    }
    f();
  }, [viewMenu] );

  const resetCart = () => {
    setCategoriesOfMenu(null);
    setCart(null);
    setCartOfCategoryPoints(null);
    setArticlesOfCategorySelected(null);
    setViewMenu(0);
    setViewPreviewInfoArticle(false);
    setViewOrderSelectArticle(false);
    setViewCart(false);
  }

  if(categoriesOfMenu != null){
    return (
      <main className={`overflow-scroll z-3 animate__animated animate__fadeIn px-3 vh-100 ${viewPreviewInfoArticle ? 'animate__animated animate__fadeIn z-0 bg-black bg-opacity-25' : ''}`}>
        {/* <div className={`position-absolute px-3 vh-100 vw-100 p-0 m-0 start-0 animate__animated animate__fadeIn z-0${viewPreviewInfoArticle ? 'bg-black bg-opacity-25' : ''}`}> */}
          {/* Header */}
          <MenuHeader className='' viewMenu={viewMenu} setViewMenu={setViewMenu} setArticlesOfCategorySelected={setArticlesOfCategorySelected}/>
          
          { viewMenu == 0 ? 
            <>
              <h2 className='fs-1 fw-bold '>Menu</h2>

              <div className='d-flex flex-wrap justify-content-around'>
                { categoriesOfMenu != null 
                  ? categoriesOfMenu.map((category)=>(
                    <MenuViewCategories
                      key={category.id}
                      nombre={category.nombre}
                      imgpath={category.imgpath}
                      category={category}
                      setViewMenu={setViewMenu}
                    />
                  ))
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
                ? <OrderSelectArticle setViewOrderSelectArticle={setViewOrderSelectArticle} articlesOfCategorySelected={articlesOfCategorySelected} />
                : <></>
              }
              <div >
                <h2 className='fs-1 fw-bold '>{categorySelected.nombre}</h2>
                    
                    <div className='d-flex flex-wrap justify-content-around'>
                      { articlesOfCategorySelected != null
                        ? articlesOfCategorySelected.map((articulo)=>(
                          <MenuViewArticles
                            key={articulo.id}
                            id={articulo.id}
                            titulo={articulo.titulo}
                            imgpath={articulo.imgpath}
                            articulo={articulo}
                            setViewPreviewInfoArticle={setViewPreviewInfoArticle}
                          />
                        ))
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

