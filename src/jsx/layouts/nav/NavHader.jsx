import React, { useState } from 'react';
import LogoIcon from '../../../assets/images/logo-icon.png';
import LogoTitle from '../../../assets/images/logo-title.png';

/// React router dom
import { Link } from 'react-router-dom';

function OpenSidebar() {
  let mainwrpper = document.getElementById('main-wrapper');
  mainwrpper.classList.toggle('menu-toggle');
}

const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="nav-header">
      <Link to="#" className="brand-logo">
        <img src={LogoIcon} alt="Logo Icon" className="brand-icon logo-abbr " />
        <img
          src={LogoTitle}
          alt="Logo Title"
          className="brand-title ms-2 brand-title"
        />
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          OpenSidebar();
        }}
      >
        <div className={`hamburger ${toggle ? 'is-active' : ''}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
