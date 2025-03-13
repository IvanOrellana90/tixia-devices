import { Fragment } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import PageTitle from '../../layouts/PageTitle';
import { Link } from 'react-router-dom';

const breadcrumbStyle = {
  '--bs-breadcrumb-divider':
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E\")",
};

const UiBreadcrumb = () => {
  return (
    <Fragment>
      <PageTitle motherMenu={'Bootstrap'} activeMenu={'breadcrumb'} />
      <div className="row">
        <div className="col-xl-6 col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Example</h4>
            </div>
            <div className="card-body">
              <nav aria-label="breadcrumb">
                <Breadcrumb>
                  <Breadcrumb.Item active>Home</Breadcrumb.Item>
                </Breadcrumb>
              </nav>

              <nav aria-label="breadcrumb">
                <Breadcrumb>
                  <Breadcrumb.Item active>
                    <Link to="#">Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Library</Breadcrumb.Item>
                </Breadcrumb>
              </nav>

              <nav aria-label="breadcrumb">
                <Breadcrumb>
                  <Breadcrumb.Item active>
                    <Link to="#">Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    <Link to="#">Library</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item aria-current="page">Data</Breadcrumb.Item>
                </Breadcrumb>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Dividers</h4>
            </div>
            <div className="card-body">
              <nav style={{ '--bs-breadcrumb-divider': `'>'` }}>
                <Breadcrumb>
                  <Breadcrumb.Item active>
                    <Link to="#">Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active aria-current="page">
                    Library
                  </Breadcrumb.Item>
                </Breadcrumb>
              </nav>
              <nav style={{ '--bs-breadcrumb-divider': `'/'` }}>
                <Breadcrumb>
                  <Breadcrumb.Item active>
                    <Link to="#">Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active aria-current="page">
                    Library
                  </Breadcrumb.Item>
                </Breadcrumb>
              </nav>
              <nav style={{ '--bs-breadcrumb-divider': `'~'` }}>
                <Breadcrumb>
                  <Breadcrumb.Item active>
                    <Link to="#">Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active aria-current="page">
                    Library
                  </Breadcrumb.Item>
                </Breadcrumb>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Svg Icon</h4>
            </div>
            <div className="card-body">
              <nav style={breadcrumbStyle}>
                <Breadcrumb>
                  <Breadcrumb.Item active>
                    <Link to={'#'}>Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active aria-current="page">
                    Library
                  </Breadcrumb.Item>
                </Breadcrumb>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Without Divider</h4>
            </div>
            <div className="card-body">
              <nav style={{ '--bs-breadcrumb-divider': `''` }}>
                <Breadcrumb>
                  <Breadcrumb.Item active>
                    <Link to={'#'}>Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Library</Breadcrumb.Item>
                </Breadcrumb>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default UiBreadcrumb;
