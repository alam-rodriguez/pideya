import React from 'react';

import { Link } from 'react-router-dom'

const MenuItem = ({link, text}) => {
  return (
    <div className='my-5'>
        <Link to={link} className='text-decoration-none text-secondary'>
            <p className='m-0 fs-3 fw-medium'>{text}</p>
        </Link>
    </div>
  )
}

export default MenuItem
