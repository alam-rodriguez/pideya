import React, { useContext } from 'react';

// React Icons
import { IoIosArrowBack } from 'react-icons/io'
import { FaPizzaSlice } from 'react-icons/fa';

// React Router Dom
import { useNavigate } from 'react-router-dom';

// Context
import { AppContext } from '../../../context/AppContext';

const MenuHeader = ({viewMenu, setViewMenu, setArticlesOfCategorySelected}) => {
  const navigate = useNavigate();

  const {setCategorySelected, setArticleSelected, amountPoints, setAmountPoints} = useContext(AppContext);

  const handleClickBack = () => {
    setArticlesOfCategorySelected(null);
    if( viewMenu == 0){
      navigate('/home');
    }else if(viewMenu == 1){
      setViewMenu(0);
      setCategorySelected(null);
    }
  }

  return (
    <header className='d-flex justify-content-between py-4'>
      <IoIosArrowBack className='display-4 ' onClick={handleClickBack} /> 
      <div className='d-flex me-4 align-items-center gap-2'>
        <p className='m-0 fs-4'>{amountPoints}</p>
        <FaPizzaSlice className='fs-5' />
      </div>
    </header>
  )
}

export default MenuHeader
