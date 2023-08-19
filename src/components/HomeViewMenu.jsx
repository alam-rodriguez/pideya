import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const HomeViewMenu = ({children, Menu, ContactDev}) => {

  const {viewMenu} = useContext(AppContext);
  return (
    <div className='d-flex h-100 w-100'>
         
      <Menu />

      <div className={`main-normal overflow-scroll container bg-white z-2 ${viewMenu ? 'main-container-view-menu': ''} `}  >
        {children} 
      </div>
      
      <ContactDev className='' />

    </div>
  )
}

export default HomeViewMenu
