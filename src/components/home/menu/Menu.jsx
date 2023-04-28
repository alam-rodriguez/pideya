import React, { useContext } from 'react';

// React Router
import { Link } from 'react-router-dom';

// Context
import { AppContext } from '../../../context/AppContext';

// Reatc Icon
import { HiFaceSmile } from 'react-icons/hi2';

// Component
import MenuItem from './MenuItem';

const Menu = () => {

  const { color1, viewMenu, setViewMenu, } = useContext(AppContext);

  if(viewMenu){
  	return (
    	<section className='w-75 mt-5'>
        <Link className='text-decoration-none text-secondary d-flex align-items-center' to=''>
					<HiFaceSmile className='' style={{fontSize:50}} />
          <p className='m-0 ms-3 fs-5 fw-medium'>Iniciar sesion</p>
        </Link>
				<nav>

				<MenuItem
					link='#' 
					text='SOBRE NOSOTROS'
				/>

				<MenuItem
					link='#' 
					text='INVITAR AMIGOS'
				/>

				<MenuItem
					link='#' 
					text='HISTORIAL DE ORDENES'
				/>

				<MenuItem
					link='#' 
					text='AJUSTES'
				/>

				<MenuItem
					link='#' 
					text='AYUDA'
				/>
					
					{/* <Link to='#'>
						<p>Sobre de nosotros</p>
					</Link>
					<Link to='#'>
						<p>Sobre de nosotros</p>
					</Link>
					<Link to='#'>
						<p>Sobre de nosotros</p>
					</Link>
					<Link to='#'>
						<p>Sobre de nosotros</p>
					</Link>
					<Link to='#'>
						<p>Sobre de nosotros</p>
					</Link> */}
					
				</nav>
    	</section>
  );
  }else {
    return <></>;
  }

}

export default Menu
