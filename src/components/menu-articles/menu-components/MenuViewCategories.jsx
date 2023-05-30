import React, { useContext, useEffect, useState } from 'react';


// Firebase
import { getArticlesByCategory } from '../../../firebase/firebaseFirestore';
import { getUrlImage } from '../../../firebase/firebaseStorage';

// Context
import { AppContext } from '../../../context/AppContext';

const MenuViewCategories = ({nombre, imgpath, category, setViewMenu}) => {
  const {categorySelected, setCategorySelected, cart, color1} = useContext(AppContext);

  // const [categorySelect, setCategorySelect] = useState(null);
  const [img, setImg] = useState('');

  const [countItem, setCountItem] = useState(0);

  const handleClick = () => {
    console.log(category);
    setCategorySelected(category);
    setViewMenu(1);
    // console.log(categorySelect);
    // setCategoriesSelected(categorySelect);
  }

  useEffect( () => {
    const f = async () => {
      console.log(category);
      // const res = await getArticlesByCategory(id);
      const img = await getUrlImage(imgpath);
      setImg(img);
      // setCategorySelect(res);
    }
    f();
  }, [] );

  useEffect( () => {
    let count = 0;
    cart.map((article)=>{
      if( article.categoria == category.id) count++;
      console.log(article.categoria);
      console.log(category.id);
    });
    setCountItem(count);
  }, [cart] );

  return (
    <div className='d-flex flex-column border rounded-4 overflow-hidden position-relative' style={{height:190, width:170}} onClick={handleClick}>
      { countItem > 0 
        ? <div className={`${color1.bgColor} rounded-circle position-absolute top-0 end-0 m-3 shadow  d-flex justify-content-center align-content-center `} style={{height:30, width:30}}>
            <p className='fs-3 text-white' >{countItem}</p>
          </div>
        : <></>
      }
      <img className='object-fit-cover' style={{height:'65%'}} src={img} alt="" />
      <p className='m-0 fs-2 fw-bold px-2' style={{height:'35%'}}>{nombre}</p>
    </div>
  );
}

export default MenuViewCategories
