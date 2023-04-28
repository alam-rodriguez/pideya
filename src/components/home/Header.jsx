import React, { useContext } from 'react';

// React Icons
import { FiMenu } from 'react-icons/fi';
import { FaPizzaSlice } from 'react-icons/fa';

// Context
import { AppContext } from '../../context/AppContext';

const Header = () => {

	const { color1, viewMenu, setViewMenu, } = useContext(AppContext);

	const handleClickMenu = () => setViewMenu(!viewMenu);

  return (
    <header className='d-flex justify-content-between align-items-center py-3 bg-white position-sticky top-0 start-0 w-100 z-1' onClick={handleClickMenu}>
		<FiMenu className={`ms-4 fs-3 ${color1.textColor}`} />
		<h2>Pedido ya</h2>
		<div className='d-flex me-4 align-items-center gap-2'>
			<p className={`m-0 fs-4 ${color1.textColor}`}>0</p>
			<FaPizzaSlice className={`fs-5 ${color1.textColor}`} />
		</div>
    </header>
  );
}

export default Header
