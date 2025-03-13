import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PageTitle = ({ motherMenu, activeMenu }) => {
  return (
    <div className="page-titles">
      <Breadcrumb>
        <div className="breadcrumb-item">
          <Link to={'#'}>{motherMenu}</Link>
        </div>
        <div className="breadcrumb-item active">
          <Link to={'#'}>{activeMenu}</Link>
        </div>
      </Breadcrumb>
    </div>
  );
};

export default PageTitle;
