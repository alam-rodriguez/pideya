// Reatc
import React, { useContext, useEffect, useState } from 'react';

// Context
import { AppContext } from '../context/AppContext';

// React Router
import { useNavigate } from 'react-router-dom';

// Components 
import Header from './home/Header';
import OrderSection from './home/order-section/OrderSection';
import LoNuevoItem from './home/section-lo-nuevo/LoNuevoItem';
import ContactUs from './home/contact-us/ContactUs';
import Menu from './home/menu/Menu';
import AddSection from './home/add-section/AddSection';
import UseCode from './home/use-code-section/UseCode';
import CategoryMenu from './home/categories-menu/CategoryMenu';

// Firebase 
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getCategories, getCategoriesFilted, getPedidosByClient, obtenerInfoApp } from '../firebase/firebaseFirestore';
import { useCallback } from 'react';

const Home = () => {
  const navigate = useNavigate();

  const { color1, viewMenu, setViewMenu, setArticleSeleted, email, setEmail, setAppInfo, isAdmin, setIsAdmin, goToHome, setGoToHome, appCategories, setAppCategories,  infoPoints, setInfoPoints, clientOrders, setClientOrders } = useContext(AppContext);

  const [categories, setCategories] = useState(null);

  // const [infoPoints, setInfoPoints] = useState(null);

  // const [clientOrders, setClientOrders] = useState(null);

  useEffect( () => {
    // logear usuario automaticamente
    onAuthStateChanged(auth, (user) => {
      if(user == null && goToHome == true) {
        navigate('/welcome'); 
        setGoToHome(false);
        getData(''); 
      }else if(user == null && goToHome == false){
        getData(''); 
      }else {
        getData(user.email);
        console.log(user.email);
        setEmail(user.email);
      }
    });
    // obtener info de la app y compruebo si es admin
    const getData = async (emailUser) => {
      const appInfo = await obtenerInfoApp();
      if(appInfo == 'no hay datos de esta app'){
        navigate('/registro-like-admin');
      }else {
        console.log(appInfo);
        setInfoPoints(appInfo.infoPoints);
        const pedidosClient = await getPedidosByClient( emailUser );
        setClientOrders(pedidosClient);
        if(appInfo.nombre == undefined){
          navigate('/registro-like-admin/details-app');
        } else {
          setAppInfo(appInfo);
          if(appInfo.admin == emailUser) setIsAdmin(true);
          setAppCategories(await getCategories());
        }
      }
    }
    // obtiene categorias y articulos para renderizar
    const getInfo = async () => {
      const res = await getCategoriesFilted('viewInHome');
      setCategories(res);
      console.log(res);
    }
    getInfo();
  }, [] );

  const handleClickMain = () => {
    if(viewMenu) setViewMenu(false);
  }

  // // obtener info de la app y compruebo si es admin
  //   const getData = useCallback(async (emailUser) => {
  //     const appInfo = await obtenerInfoApp();
  //     if(appInfo == 'no hay datos de esta app'){
  //       navigate('/registro-like-admin');
  //     }else {
  //       if(appInfo.nombre == undefined){
  //         navigate('/registro-like-admin/details-app');
  //       } else {
  //         setAppInfo(appInfo);
  //         if(appInfo.admin == emailUser) setIsAdmin(true);
  //         setAppCategories(await getCategories());
  //       }
  //     }
  //   }, [] );

  // obtiene categorias y articulos para renderizar
    // const getInfo = useCallback(async () => {
    //   const res = await getCategoriesFilted('viewInHome');
    //   setCategories(res);
    //   console.log(res);
    // }, [] );

  if(categories != null){
    return(
      <div className={`container px-4 vh-100 vw-100 position-absolute  ${viewMenu ? 'd-flex overflow-hidden py-5 overflow-hidden': ''}`} style={{}}>
        
        { (viewMenu) ? 
          // Menu 
          <Menu />
        : <></>}
  
        <main className={`${viewMenu ? 'border border-secondary shadow-lg p-3 position-absolute overflow-hidden h-75 w-100 bg-white ms-5 my-5 ' : ''}`} style={{left:viewMenu?'63%' : '', maxWidth:viewMenu ? '100%' : '',}} onClick={handleClickMain}>
          {/* Header */}
          <Header />
          
          {/* Order Section */}
          <OrderSection />
  
          {/* Use Code Section */}
          <UseCode />
  
          { (categories != null)
              ? categories.map( (category) => (
                <CategoryMenu key={category.id} category={category} color1={color1} />
              ))
            : <></>
          }
  
  
          {/* TODO: borrar luego */}
          <div style={{height: 500}}></div>
  
  
  
  
  
  
  
  
          <section className='w-100 my-5 '>
            <div className='d-flex justify-content-between w-100'>
              <h3 className='fw-bold'>Lo Nuevo!</h3>
              <p className={`p-0 fw-bold ${color1.textColor}`}>TODO</p>
            </div>
            <div className='d-flex flex-nowrap overflow-x-scroll'>
              {/* <img src="" alt="" /> */}
              <LoNuevoItem
                img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9OQb1WegyJ_RwH_lMA6IADJ2jW5dU64YjAIKHdJStaKaSj2JOSpXd7I9mWwJl_MRqZRs&usqp=CAU'
                title='hola mundo 1' 
                subTitle='Exercitation reprehenderit deserunt Lorem exercitation incididunt cupidatat. Officia id ullamco reprehenderit cillum sint aliqua consequat proident dolor aliquip mollit fugiat anim.' 
                id='345678' 
              />
  
              <LoNuevoItem
                img='https://www.mat3am.net/assets/offers/2023/1/22/jpg/94d386f5-44f6-421f-9088-8a8df0e893f3.jpg'
                title='hola mundo 2' 
                subTitle='Lorem Ullamco aliqua sunt ut ipsum aliqua occaecat incididunt. Ut proident labore velit aliquip elit excepteur occaecat ullamco occaecat. Ullamco amet ea ad commodo laboris ex quis fugiat nostrud proident laboris ad ut et.' 
                id='345678' 
              />
  
              <LoNuevoItem
                img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9OQb1WegyJ_RwH_lMA6IADJ2jW5dU64YjAIKHdJStaKaSj2JOSpXd7I9mWwJl_MRqZRs&usqp=CAU'
                title='hola mundo 1' 
                subTitle='Exercitation reprehenderit deserunt Lorem exercitation incididunt cupidatat. Officia id ullamco reprehenderit cillum sint aliqua consequat proident dolor aliquip mollit fugiat anim.' 
                id='345678' 
              />
  
              <LoNuevoItem
                img='https://www.mat3am.net/assets/offers/2023/1/22/jpg/94d386f5-44f6-421f-9088-8a8df0e893f3.jpg'
                title='hola mundo 2' 
                subTitle='Lorem Ullamco aliqua sunt ut ipsum aliqua occaecat incididunt. Ut proident labore velit aliquip elit excepteur occaecat ullamco occaecat. Ullamco amet ea ad commodo laboris ex quis fugiat nostrud proident laboris ad ut et.' 
                id='345678' 
              />
              <LoNuevoItem
                img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9OQb1WegyJ_RwH_lMA6IADJ2jW5dU64YjAIKHdJStaKaSj2JOSpXd7I9mWwJl_MRqZRs&usqp=CAU'
                title='hola mundo 1' 
                subTitle='Exercitation reprehenderit deserunt Lorem exercitation incididunt cupidatat. Officia id ullamco reprehenderit cillum sint aliqua consequat proident dolor aliquip mollit fugiat anim.' 
                id='345678' 
              />
  
              <LoNuevoItem
                img='https://www.mat3am.net/assets/offers/2023/1/22/jpg/94d386f5-44f6-421f-9088-8a8df0e893f3.jpg'
                title='hola mundo 2' 
                subTitle='Lorem Ullamco aliqua sunt ut ipsum aliqua occaecat incididunt. Ut proident labore velit aliquip elit excepteur occaecat ullamco occaecat. Ullamco amet ea ad commodo laboris ex quis fugiat nostrud proident laboris ad ut et.' 
                id='345678' 
              />
  
              <div className='bg-danger me-4 rounded-5' style={{height:150, minWidth:230}}></div>
              <div className='bg-danger me-4 rounded-5' style={{height:150, minWidth:230}}></div>
              <div className='bg-danger me-4 rounded-5' style={{height:150, minWidth:230}}></div>
              <div className='bg-danger me-4 rounded-5' style={{height:150, minWidth:230}}></div>
  
            </div>
          </section>
  
          <section className='w-100 my-5'>
            <div className='d-flex justify-content-between w-100'>
              <h3 className='fw-bold'>Combos</h3>
              <p className={`p-0 fw-bold ${color1.textColor}`}>Todo</p>
            </div>
            <div className='d-flex flex-nowrap overflow-x-scroll'>
              {/* <img src="" alt="" /> */}
              <div className='bg-warning me-4 rounded-5' style={{height:150, minWidth:230}}></div>
              <div className='bg-warning me-4 rounded-5' style={{height:150, minWidth:230}}></div>
              <div className='bg-warning me-4 rounded-5' style={{height:150, minWidth:230}}></div>
              <div className='bg-warning me-4 rounded-5' style={{height:150, minWidth:230}}></div>
              <div className='bg-warning me-4 rounded-5' style={{height:150, minWidth:230}}></div>
            </div>
          </section>
  
          <section className='w-100 my-5'>
            <div className='d-flex justify-content-between w-100'>
              <h3 className='fw-bold'>Mis Puntos</h3>
              <p className={`p-0 fw-bold ${color1.textColor}`}></p>
            </div>
            <div className='d-flex flex-nowrap overflow-x-scroll'>
              {/* <img src="" alt="" /> */}
              <div className='bg-primary me-4 rounded-5' style={{height:150, minWidth:230}}></div>
              <div className='bg-primary me-4 rounded-5' style={{height:150, minWidth:230}}></div>
            </div>
          </section>
  
          <section className='w-100 my-5'>
            <div className='d-flex justify-content-between w-100'>
              <h3 className='fw-bold'>Mis Ofertas</h3>
              <p className={`p-0 fw-bold ${color1.textColor}`}></p>
            </div>
            <div className='d-flex flex-nowrap'>
              {/* <img src="" alt="" /> */}
              <div className='bg-success me-4 rounded-5' style={{height:150, minWidth:'100%'}}></div>
            </div>
          </section>
  
          <section className='w-100 my-5'>
            <div className='d-flex justify-content-between w-100'>
              <h3 className='fw-bold'>Usa tus puntos</h3>
              <p className={`p-0 fw-bold ${color1.textColor}`}>todo</p>
            </div>
            <div className='d-flex flex-nowrap overflow-x-scroll'>
              {/* <img src="" alt="" /> */}
              <div className='bg-info me-4 rounded-5' style={{height:110, minWidth:155}}></div>
              <div className='bg-info me-4 rounded-5' style={{height:110, minWidth:155}}></div>
              <div className='bg-info me-4 rounded-5' style={{height:110, minWidth:155}}></div>
              <div className='bg-info me-4 rounded-5' style={{height:110, minWidth:155}}></div>
              <div className='bg-info me-4 rounded-5' style={{height:110, minWidth:155}}></div>
              <div className='bg-info me-4 rounded-5' style={{height:110, minWidth:155}}></div>
            </div>
          </section>
  
          <section className='w-100 my-5'>
            <div className='d-flex flex-nowrap'>
              {/* <img src="" alt="" /> */}
              <div className={`${color1.bgColor} me-4 rounded-5`} style={{height:110, minWidth:'100%'}}></div>
            </div>
          </section>
  
          <section className='w-100 my-5'>
            <div className='d-flex flex-nowrap'>
              {/* <img src="" alt="" /> */}
              <div className={`${color1.bgColor} me-4 rounded-5`} style={{height:70, minWidth:'100%'}}></div>
            </div>
          </section>
  
          {/* Seccion de contacto */}
          <ContactUs />
          
  
          {/* Seccion para agregar articulo */}
          {isAdmin ? 
            <AddSection />
          : <></>
          }
  
        </main>
        {viewMenu ? 
          <div className='w-100 d-flex flex-column bottom-0 start-0 position-absolute border-top p-3 pb-3' style={{}}>
            <p className='m-0 text-center text-secondary'>829-319-8834</p>
            <p className='m-0 text-center text-secondary'>DESARROLLADO POR ALAM RODRIGUEZ</p>
          </div>
        : <></>}
      </div>
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


// export default React.memo(Home);
export default Home;
