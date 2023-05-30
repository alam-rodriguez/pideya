import React from 'react';

// React Icons
import { IoIosArrowBack } from 'react-icons/io';

// React Router Dom
import { useNavigate } from 'react-router-dom';

const Header = ({link = '/home', title = 'Pedidos'}) => {

  const navigate = useNavigate();

  const handleClickBack = () =>  navigate(link);

  return (
    <header className='row border-bottom py-3'>
      <IoIosArrowBack className='display-4 col-2' onClick={handleClickBack} />
      <p className='m-0 fs-2 fw-medium col-8 text-center'>{title}</p>
      <div className=''></div>
    </header>
  );
}

export default Header
