import React, { useContext, useEffect, useState } from 'react';

// React-Icons

// Firebase
import { getCategories } from '../../../firebase/firebaseFirestore';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Header
import Header from '../add-articles-components/Header'

// Context
import { AppContext } from '../../../context/AppContext';

const ViewCategories = () => {
  
  const navigate = useNavigate();

  // Effects
  useEffect( () => {
    const f = async () => { 
      const res = await getCategories();
      setCategories(res);
    }
    f();
  }, [] );

  // States
  const { setCategorySelected } = useContext(AppContext);
  const [categories, setCategories] = useState(null);

  // handles
  const handleClickCategory = (category) => {
    setCategorySelected(category);
    navigate('/edit-category');
  }

  const handleClickCrearCategoria = () => navigate('/create-categories');

  if(categories != null){
    return (
      <main className='border-0 mx-3' >
        {/* Header */}
        <Header path='/admin-options' />
  
        <section className='d-flex flex-column gap-4'>
  
          { categories != null 
            ? categories.map((category)=>(
              <div className='border-bottom py-2' key={category.id} onClick={()=>handleClickCategory(category)}>
                <p className='m-0 fs-1 fw-medium'>{category.nombre}</p>
              </div>
            ))
          : <></>}
  
          <button className='btn form-control btn-success fs-3 position-absolute bottom-0 start-50 mb-4 translate-middle rounded-0' onClick={handleClickCrearCategoria}>Crear Categoria</button>
  
        </section>
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


export default ViewCategories;

