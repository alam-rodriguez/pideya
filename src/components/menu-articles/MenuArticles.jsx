import React, { useContext, useEffect, useState } from 'react';

// Context
import { AppContext } from '../../context/AppContext';

// Firebase
import { getArticlesByCategory, getCategoriesFilted } from '../../firebase/firebaseFirestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Components
import MenuHeader from './menu-components/MenuHeader';
import MenuViewCategories from './menu-components/MenuViewCategories';
import MenuViewArticles from './menu-components/MenuViewArticles';
import PreviewInfoArticle from './menu-components/PreviewInfoArticle';
import OrderSelectArticle from './menu-components/OrderSelectArticle';
import CartPreview from './menu-components/cart/CartPreview';
import Cart from './menu-components/cart/Cart';

const MenuArticles = () => {

  const { email, setEmail, categorySelected, cart, setCart, cartOfCategoryPoints, setCartOfCategoryPoints, infoPointsUser, setInfoPointsUser } = useContext(AppContext)

  const [categories, setCategories] = useState(null);
  const [articlesOfCategorySelected, setArticlesOfCategorySelected] = useState(null);

  const [viewMenu, setViewMenu] = useState(0);

  const [viewPreviewInfoArticle, setViewPreviewInfoArticle] = useState(false);

  const [viewOrderSelectArticle, setViewOrderSelectArticle] = useState(false);

  const [viewCart, setViewCart] = useState(false);

  // Loguea al usuario si automaticamente
  useEffect( () => { 
    if(email == null){
      const auth = getAuth();
      onAuthStateChanged(auth, (user)  => {
        if(user != null) setEmail(user.email);
      });
    }
  }, [] );

  useEffect( () => {
    const f = async () => {
      if(viewMenu == 0 ){
        const res = await getCategoriesFilted('viewInMenu');
        setCategories(res);
        console.log(res);
      }else if(viewMenu == 1){
        const res = await getArticlesByCategory(categorySelected.id);
        setArticlesOfCategorySelected(res);
      }
    }
    f();
  }, [viewMenu] );

  const resetCart = () => {
    setCategories(null);
    setCart(null);
    setCartOfCategoryPoints(null);
    setArticlesOfCategorySelected(null);
    setViewMenu(0);
    setViewPreviewInfoArticle(false);
    setViewOrderSelectArticle(false);
    setViewCart(false);
  }

  if(categories != null){
    return (
      <main className={`px-3 vh-100 z-0 ${viewPreviewInfoArticle ? 'bg-black bg-opacity-25' : ''}`}>
        {/* Header */}
        <MenuHeader viewMenu={viewMenu} setViewMenu={setViewMenu}/>
  
        { viewMenu == 0 ? 
          <>
            <h2 className='fs-1 fw-bold '>Menu</h2>
  
            <div className='d-flex flex-wrap justify-content-around'>
              { categories != null 
                ? categories.map((category)=>(
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
              ? <PreviewInfoArticle setViewPreviewInfoArticle={setViewPreviewInfoArticle} setViewOrderSelectArticle={setViewOrderSelectArticle} />
              : <></> 
            }
            { viewOrderSelectArticle
              ? <OrderSelectArticle setViewOrderSelectArticle={setViewOrderSelectArticle} />
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
  
        { ((cart.length > 0 || cartOfCategoryPoints.length > 0) && (!viewOrderSelectArticle) ) ?
         <CartPreview setViewCart={setViewCart} />
        : <></>
        }
  
        { viewCart 
          ? <Cart setViewCart={setViewCart} setViewMenu={setViewMenu} resetCart={resetCart} />
          : <></>
        }
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

