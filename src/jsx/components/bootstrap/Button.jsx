import React, { Fragment } from 'react';
import { Row, Col, Card, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import PageTitle from '../../layouts/PageTitle';
import JobieNav from '../../layouts/nav';

const UiButton = () => {
  return (
    <Fragment>
      <PageTitle activeMenu="Buttons" motherMenu="Bootstrap" />
      <div className="btn-page">
        <Row>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Buttons</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  Default button style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Button className="me-1" variant="primary">
                  Primary
                </Button>
                <Button className="me-1" variant="secondary">
                  Secondary
                </Button>
                <Button className="me-1" variant="success">
                  Success
                </Button>
                <Button className="me-1" variant="danger">
                  Danger
                </Button>
                <Button className="me-1" variant="warning">
                  Warning
                </Button>
                <Button className="me-1" variant="info">
                  Info
                </Button>
                <Button className="me-1" variant="light">
                  Light
                </Button>
                <Button variant="dark">Dark</Button>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Light Buttons</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  Button Light style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Button className="me-1" variant="primary light">
                  Primary
                </Button>
                <Button className="me-1" variant="secondary light">
                  Secondary
                </Button>
                <Button className="me-1" variant="success light">
                  Success
                </Button>
                <Button className="me-1" variant="danger light">
                  Danger
                </Button>
                <Button className="me-1" variant="warning light">
                  Warning
                </Button>
                <Button className="me-1" variant="info light">
                  Info
                </Button>
                <Button className="me-1" variant="light light">
                  Light
                </Button>
                <Button variant="dark light">Dark</Button>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Outline Buttons</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  Default outline button style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Button className="me-1" variant="outline-primary">
                  Primary
                </Button>
                <Button className="me-1" variant="outline-secondary">
                  Secondary
                </Button>
                <Button className="me-1" variant="outline-success">
                  Success
                </Button>
                <Button className="me-1" variant="outline-danger">
                  Danger
                </Button>
                <Button className="me-1" variant="outline-warning">
                  Warning
                </Button>
                <Button className="me-1" variant="outline-info">
                  Info
                </Button>
                <Button className="me-1" variant="outline-light">
                  Light
                </Button>
                <Button variant="outline-dark">Dark</Button>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Button Sizes</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  add <code>.btn-lg .btn-sm .btn-xs</code> to change the style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Button className="me-1" variant="primary btn-lg">
                  Large Button
                </Button>
                <Button className="me-1" variant="primary">
                  Default Button
                </Button>
                <Button className="me-1" variant="primary btn-sm">
                  Small Button
                </Button>
                <Button className="me-1" variant="primary btn-xs">
                  Extra Small Button
                </Button>
                <Button variant="primary btn-xxs">Extra Small Button</Button>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Outline Button Sizes</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  add <code>.btn-lg .btn-sm .btn-xs</code> to change the style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Button className="me-1" variant="outline-primary btn-lg">
                  Large button
                </Button>
                <Button className="me-1" variant="outline-primary">
                  Default button
                </Button>
                <Button className="me-1" variant="outline-primary btn-md">
                  Small button
                </Button>
                <Button className="me-1" variant="outline-primary btn-sm">
                  Small button
                </Button>
                <Button className="me-1" variant="outline-primary btn-xs">
                  Extra small button
                </Button>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Rounded Buttons</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  add <code>.btn-rounded</code> to change the style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Card.Title></Card.Title>
                <Button className="me-1" variant="primary btn-rounded">
                  Primary
                </Button>
                <Button className="me-1" variant="secondary btn-rounded">
                  Secondary
                </Button>
                <Button className="me-1" variant="success btn-rounded">
                  Success
                </Button>
                <Button className="me-1" variant="danger btn-rounded">
                  Danger
                </Button>
                <Button className="me-1" variant="warning btn-rounded">
                  Warning
                </Button>
                <Button className="me-1" variant="info btn-rounded">
                  Info
                </Button>
                <Button className="me-1" variant="light btn-rounded">
                  Light
                </Button>
                <Button variant="dark btn-rounded">Dark</Button>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Rounded outline Buttons</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  add <code>.btn-rounded</code> to change the style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <div className="rounded-button">
                  <Button
                    className="me-1"
                    variant="outline-primary btn-rounded"
                  >
                    Primary
                  </Button>
                  <Button
                    className="me-1"
                    variant="outline-secondary btn-rounded"
                  >
                    Secondary
                  </Button>
                  <Button
                    className="me-1"
                    variant="outline-success btn-rounded"
                  >
                    Success
                  </Button>
                  <Button className="me-1" variant="outline-danger btn-rounded">
                    Danger
                  </Button>
                  <Button
                    className="me-1"
                    variant="outline-warning btn-rounded"
                  >
                    Warning
                  </Button>
                  <Button className="me-1" variant="outline-info btn-rounded">
                    Info
                  </Button>
                  <Button className="me-1" variant="outline-light btn-rounded">
                    Light
                  </Button>
                  <Button variant="outline-dark btn-rounded">Dark</Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Button Right icons</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  add <code>.btn-icon-end</code> to change the style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Button variant="primary" className="me-1">
                  Add to cart{' '}
                  <span className="btn-icon-end">
                    <i className="fa fa-shopping-cart" />
                  </span>
                </Button>
                <Button variant="info" className="me-1">
                  Add to wishlist{' '}
                  <span className="btn-icon-end">
                    <i className="fa fa-heart" />
                  </span>
                </Button>
                <Button variant="danger" className="me-1">
                  Remove{' '}
                  <span className="btn-icon-end">
                    <i className="fa fa-close" />
                  </span>
                </Button>
                <Button variant="secondary" className="me-1">
                  Sent message{' '}
                  <span className="btn-icon-end">
                    <i className="fa fa-envelope" />
                  </span>
                </Button>
                <Button variant="warning" className="me-1">
                  Add bookmark{' '}
                  <span className="btn-icon-end">
                    <i className="fa fa-star" />
                  </span>
                </Button>
                <Button variant="success" className="me-1">
                  Success{' '}
                  <span className="btn-icon-end">
                    <i className="fa fa-check" />
                  </span>
                </Button>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Button Left icons</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  add <code>.btn-icon-start</code> to change the style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Button variant="primary btn-rounded" className="me-1">
                  <span className="btn-icon-start text-primary">
                    <i className="fa fa-shopping-cart" />
                  </span>
                  Buy
                </Button>
                <Button variant="info btn-rounded" className="me-1">
                  <span className="btn-icon-start text-info">
                    <i className="fa fa-plus color-info" />
                  </span>
                  Add
                </Button>
                <Button variant="danger btn-rounded" className="me-1">
                  <span className="btn-icon-start text-danger">
                    <i className="fa fa-envelope color-danger" />
                  </span>
                  Email
                </Button>
                <Button variant="secondary btn-rounded" className="me-1">
                  <span className="btn-icon-start text-secondary">
                    <i className="fa fa-share-alt color-secondary" />{' '}
                  </span>
                  Share
                </Button>
                <Button variant="warning btn-rounded" className="me-1">
                  <span className="btn-icon-start text-warning">
                    <i className="fa fa-download color-warning" />
                  </span>
                  Download
                </Button>
                <Button variant="success btn-rounded">
                  <span className="btn-icon-start text-success">
                    <i className="fa fa-upload color-success" />
                  </span>
                  Upload
                </Button>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Square Buttons</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  add <code>.btn-square</code> to change the style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Button className="me-1" variant="primary btn-square">
                  Primary
                </Button>
                <Button className="me-1" variant="secondary btn-square">
                  Secondary
                </Button>
                <Button className="me-1" variant="success btn-square">
                  Success
                </Button>
                <Button className="me-1" variant="danger btn-square">
                  Danger
                </Button>
                <Button className="me-1" variant="warning btn-square">
                  Warning
                </Button>
                <Button className="me-1" variant="info btn-square">
                  Info
                </Button>
                <Button className="me-1" variant="light btn-square">
                  Light
                </Button>
                <Button variant="dark btn-square">Dark</Button>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Square Outline Buttons</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  add <code>.btn-square</code> to change the style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Button className="me-1" variant="outline-primary btn-square">
                  Primary
                </Button>
                <Button className="me-1" variant="outline-secondary btn-square">
                  Secondary
                </Button>
                <Button className="me-1" variant="outline-success btn-square">
                  Success
                </Button>
                <Button className="me-1" variant="outline-danger btn-square">
                  Danger
                </Button>
                <Button className="me-1" variant="outline-warning btn-square">
                  Warning
                </Button>
                <Button className="me-1" variant="outline-info btn-square">
                  Info
                </Button>
                <Button className="me-1" variant="outline-light btn-square">
                  Light
                </Button>
                <Button variant="outline-dark btn-square">Dark</Button>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Rounded Button</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  add <code>.btn-rounded</code> to change the style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Button className="me-1" variant="primary btn-rounded">
                  Primary
                </Button>
                <Button className="me-1" variant="secondary btn-rounded">
                  Secondary
                </Button>
                <Button className="me-1" variant="success btn-rounded">
                  Success
                </Button>
                <Button className="me-1" variant="danger btn-rounded">
                  Danger
                </Button>
                <Button className="me-1" variant="warning btn-rounded">
                  Warning
                </Button>
                <Button className="me-1" variant="info btn-rounded">
                  Info
                </Button>
                <Button className="me-1" variant="light btn-rounded">
                  Light
                </Button>
                <Button variant="dark btn-rounded">Dark</Button>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Rounded outline Buttons</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  add <code>.btn-rounded</code> to change the style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Button className="me-1" variant="outline-primary btn-rounded">
                  Primary
                </Button>
                <Button
                  className="me-1"
                  variant="outline-secondary btn-rounded"
                >
                  Secondary
                </Button>
                <Button className="me-1" variant="outline-success btn-rounded">
                  Success
                </Button>
                <Button className="me-1" variant="outline-danger btn-rounded">
                  Danger
                </Button>
                <Button className="me-1" variant="outline-warning btn-rounded">
                  Warning
                </Button>
                <Button className="me-1" variant="outline-info btn-rounded">
                  Info
                </Button>
                <Button className="me-1" variant="outline-light btn-rounded">
                  Light
                </Button>
                <Button variant="outline-dark btn-rounded">Dark</Button>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Dropdown Button</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  Default dropdown button style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <ButtonGroup className="me-1">
                  <Dropdown>
                    <Dropdown.Toggle variant="primary">Primary</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="javascript:void()">
                        Dropdown link
                      </Dropdown.Item>
                      <Dropdown.Item href="javascript:void()">
                        Dropdown link
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ButtonGroup>
                <ButtonGroup className="me-1">
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                      Secondary
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="javascript:void()">
                        Dropdown link
                      </Dropdown.Item>
                      <Dropdown.Item href="javascript:void()">
                        Dropdown link
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ButtonGroup>
                <ButtonGroup className="me-1">
                  <Dropdown>
                    <Dropdown.Toggle variant="success">Success</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="javascript:void()">
                        Dropdown link
                      </Dropdown.Item>
                      <Dropdown.Item href="javascript:void()">
                        Dropdown link
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ButtonGroup>
                <ButtonGroup className="me-1">
                  <Dropdown>
                    <Dropdown.Toggle variant="warning">Warning</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="javascript:void()">
                        Dropdown link
                      </Dropdown.Item>
                      <Dropdown.Item href="javascript:void()">
                        Dropdown link
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ButtonGroup>

                <ButtonGroup>
                  <Dropdown>
                    <Dropdown.Toggle variant="danger">Danger</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="javascript:void()">
                        Dropdown link
                      </Dropdown.Item>
                      <Dropdown.Item href="javascript:void()">
                        Dropdown link
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ButtonGroup>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Buttons Transparent</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  Button transparent style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Button className="me-1" variant="primary tp-btn">
                  Primary
                </Button>
                <Button className="me-1" variant="secondary tp-btn">
                  Secondary
                </Button>
                <Button className="me-1" variant="success tp-btn">
                  Success
                </Button>
                <Button className="me-1" variant="danger tp-btn">
                  Danger
                </Button>
                <Button className="me-1" variant="warning tp-btn">
                  Warning
                </Button>
                <Button className="me-1" variant="info tp-btn">
                  Info
                </Button>
                <Button className="me-1" variant="light tp-btn">
                  Light
                </Button>
                <Button variant="dark tp-btn">Dark</Button>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Buttons Transparent Light</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  Button transparent light style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Button className="me-1" variant="primary tp-btn-light">
                  Primary
                </Button>
                <Button className="me-1" variant="secondary tp-btn-light">
                  Secondary
                </Button>
                <Button className="me-1" variant="success tp-btn-light">
                  Success
                </Button>
                <Button className="me-1" variant="danger tp-btn-light">
                  Danger
                </Button>
                <Button className="me-1" variant="warning tp-btn-light">
                  Warning
                </Button>
                <Button className="me-1" variant="info tp-btn-light">
                  Info
                </Button>
                <Button className="me-1" variant="tp-btn-light text-black">
                  Light
                </Button>
                <Button variant="dark tp-btn-light">Dark</Button>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Disabled Button</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  add <code>disabled="disabled"</code> to change the style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Button
                  variant="primary btn-rounded"
                  disabled="disabled"
                  className="me-1"
                >
                  Primary
                </Button>
                <Button
                  variant="secondary btn-rounded"
                  disabled="disabled"
                  className="me-1"
                >
                  Secondary
                </Button>
                <Button
                  variant="success btn-rounded"
                  disabled="disabled"
                  className="me-1"
                >
                  Success
                </Button>
                <Button
                  variant="danger btn-rounded"
                  disabled="disabled"
                  className="me-1"
                >
                  Danger
                </Button>
                <Button
                  variant="warning btn-rounded"
                  disabled="disabled"
                  className="me-1"
                >
                  Warning
                </Button>
                <Button variant="info btn-rounded" disabled="disabled">
                  Info
                </Button>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Card>
              <Card.Header className="d-block">
                <Card.Title>Socia icon Buttons with Name</Card.Title>
                <Card.Text className="mb-0 subtitle">
                  add <code>.btn-facebook, .btn-twitter, .btn-youtube...</code>{' '}
                  to change the style
                </Card.Text>
              </Card.Header>
              <div className="card-body">
                <Button variant="facebook" className="me-1">
                  Facebook{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-facebook-f" />
                  </span>
                </Button>
                <Button variant="twitter" className="me-1">
                  Twitter{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-twitter" />
                  </span>
                </Button>
                <Button variant="youtube" className="me-1">
                  Youtube{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-youtube" />
                  </span>
                </Button>
                <Button variant="instagram" className="me-1">
                  Instagram{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-instagram" />
                  </span>
                </Button>
                <Button variant="pinterest" className="me-1">
                  Pinterest{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-pinterest-square" />
                  </span>
                </Button>
                <Button variant="linkedin" className="me-1">
                  Linkedin{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-linkedin-in" />
                  </span>
                </Button>
                <Button variant="google-plus" className="me-1">
                  Google +{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-google-plus-g" />
                  </span>
                </Button>
                <Button variant="google" className="me-1">
                  Google{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-google" />
                  </span>
                </Button>
                <Button variant="snapchat" className="me-1">
                  Snapchat{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-snapchat" />
                  </span>
                </Button>
                <Button variant="whatsapp" className="me-1">
                  Whatsapp{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-whatsapp" />
                  </span>
                </Button>
                <Button variant="tumblr" className="me-1">
                  Tumblr{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-tumblr" />
                  </span>
                </Button>
                <Button variant="reddit" className="me-1">
                  Reddit{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-reddit" />
                  </span>
                </Button>
                <Button variant="spotify" className="me-1">
                  Spotify{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-spotify" />
                  </span>
                </Button>
                <Button variant="yahoo" className="me-1">
                  Yahoo{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-yahoo" />
                  </span>
                </Button>
                <Button variant="dribbble" className="me-1">
                  Dribbble{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-dribbble" />
                  </span>
                </Button>
                <Button variant="skype" className="me-1">
                  Skype{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-skype" />
                  </span>
                </Button>
                <Button variant="quora" className="me-1">
                  Quora{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-quora" />
                  </span>
                </Button>
                <Button variant="vimeo">
                  Vimeo{' '}
                  <span className="btn-icon-end">
                    <i className="fab fa-vimeo-v" />
                  </span>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default UiButton;
