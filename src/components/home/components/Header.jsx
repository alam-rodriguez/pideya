import React, { useEffect } from 'react';

// React Icons
import { IoIosArrowBack } from 'react-icons/io';

// React Router Dom
import { useNavigate } from 'react-router-dom';

const Header = ({link = '/home', title = 'Pedidos', setViewSearchCode}) => {

  const navigate = useNavigate();

  useEffect(() => {
    console.log('first');
  }, [] );
  
  const handleClickBack = () => setViewSearchCode(false);
  // const handleClickBack = () =>  navigate(link);

  return (
    <header className='row border-bottom py-3'>
      <IoIosArrowBack className='display-4 col-2 z-1' onClick={handleClickBack} />
      <p className='m-0 fs-4 fw-medium position-absolute start-50 translate-middle-x text-center'>{title}</p>
      {/* <div className=''></div> */}
    </header>
  );
}

export default Header
