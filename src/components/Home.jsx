// Reatc
import { useContext, useEffect } from 'react';

// Context
import { AppContext } from '../context/AppContext';

// React Router
import { useNavigate } from 'react-router-dom';

// imagen
import pizzaOrdenar from "../images/pizzaOrdenar.png";

// React Icons
import { TfiReload } from 'react-icons/tfi';

// Components 
import Header from './home/Header';
import OrderButton from './home/OrderButton';
import LoNuevoItem from './home/section-lo-nuevo/LoNuevoItem';
import ContactUs from './home/contact-us/ContactUs';

const Home = () => {
  const navigate = useNavigate();

  const { color1, articuloSlected, setArticuloSlected, } = useContext(AppContext);

  const { nombre, setNombre } = useContext(AppContext);

  useEffect( () => {
    
  }, [] );

  return(
    <main className='container px-4'>
      <Header />
      <section className='d-flex gap-3' style={{paddingTop:70}}>
        <OrderButton 
          text='ORDENAR AHORA'
          textColor='text-white'
          bgColor={color1.bgColor}
          type='imagen'
          seletionLetf={pizzaOrdenar}
        />
        <OrderButton 
          text='REPETIR ORDEN'
          textColor='text-success'
          bgColor='bg-secondary-subtle'
          type='icono'
          seletionLetf={<TfiReload className={`${color1.textColor} display-2`} />}
        />
      </section>

      <section className='w-100 my-5'>
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

      <ContactUs />
    </main>
  );
}


export default Home;