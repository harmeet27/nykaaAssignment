import React from 'react';
import svg from "../../nykaa_logo.svg";
import './Header.css';

const Header = () => {
  return(
      <div className="header">
          <div className="logo">
           <img src={svg} alt="Nykaa" />
           </div>
      </div>
  )
};

export default Header;