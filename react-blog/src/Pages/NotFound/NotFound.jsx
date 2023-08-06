// NotFound.js
import React from 'react';
import Topbar from '../../components/TopBar/Topbar';
import "./NotFound.css"

const NotFound = () => {
  return (
    <div>
    <Topbar />
    <div className='notFound'>
      <div className='notFoundImage'>
        <img  src='/Images/404.png' alt='404 icon'/>
      </div>
      <div className='notFoundText'>
      <h1>Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      </div>
    </div>
    </div>
  );
};

export default NotFound;
