import { Fragment } from 'react';
import PageTitle from '../../layouts/PageTitle';
import { Row, Col, Spinner, Button } from 'react-bootstrap';

const SpinnerColor = [
  { colors: 'primary' },
  { colors: 'secondary' },
  { colors: 'success' },
  { colors: 'danger' },
  { colors: 'warning' },
  { colors: 'info' },
  { colors: 'light' },
  { colors: 'dark' },
];

export default function Spinners() {
  return (
    <Fragment>
      <PageTitle activeMenu={'Spinners'} motherMenu={'Bootstrap'} />
      <Row>
        <Col className="col-12" md={6}>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Default Spinner</h4>
            </div>
            <div className="card-body">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </Col>
        <Col className="col-12" md={6}>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Growing Spinner</h4>
            </div>
            <div className="card-body">
              <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </Col>
        <Col className="col-12" md={6}>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Colorfull Spinners</h4>
            </div>
            <div className="card-body">
              {SpinnerColor.map((elem, index) => (
                <Spinner
                  className="me-1"
                  animation="border"
                  variant={elem.colors}
                  key={index}
                />
              ))}
            </div>
          </div>
        </Col>
        <Col className="col-12" md={6}>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Colorfull Growing Spinners</h4>
            </div>
            <div className="card-body">
              {SpinnerColor.map((elem, index) => (
                <Spinner
                  animation="grow"
                  variant={elem.colors}
                  className="me-1"
                  key={index}
                />
              ))}
            </div>
          </div>
        </Col>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Alighment Flex</h4>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <strong role="status">Loading...</strong>
                <div
                  className="spinner-border ms-auto"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <Col className="col-12" md={6}>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Spinner Sizes</h4>
            </div>
            <div className="card-body d-flex flex-wrap align-items-center">
              <Spinner animation="border" size="sm" className="me-4" />
              <Spinner animation="grow" size="sm" className="me-4" />
              <Spinner animation="border" size="" className="me-4" />
              <Spinner animation="grow" size="" className="me-4" />
            </div>
          </div>
        </Col>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Buttons Spinner</h4>
            </div>
            <div className="card-body d-flex flex-wrap align-items-center">
              <Button variant="primary" disabled className="mb-2 me-2">
                <Spinner animation="border" size="sm" />
              </Button>
              <Button variant="primary" className="mb-2 me-2" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{' '}
                Loading...
              </Button>
              <Button variant="primary" disabled className="mb-2 me-2">
                <Spinner animation="grow" size="sm" />
              </Button>
              {SpinnerColor.map((elem, ind) => (
                <Button
                  variant={elem.colors}
                  className="mb-2 me-2"
                  disabled
                  key={ind}
                >
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{' '}
                  Loading...
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Row>
    </Fragment>
  );
}
