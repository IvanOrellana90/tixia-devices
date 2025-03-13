import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="copyright">
        <p>
          Copyright © Designed &amp; Developed by{' '}
          <Link to="http://ksec.cl/" target="_blank">
            Ksec 
          </Link>{' '}
          {year}
        </p>
      </div>
    </div>
  );
};

export default Footer;
