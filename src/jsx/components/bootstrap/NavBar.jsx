import { Fragment, useReducer } from 'react';
import PageTitle from '../../layouts/PageTitle';
import { Dropdown, Collapse, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../../../assets/images/logo.png';

const initialState = true;
const reducer = (state, action) => {
  switch (action.type) {
    case 'navbar1':
      return { ...state, navbar1: !state.navbar1 };
    case 'navbar2':
      return { ...state, navbar2: !state.navbar2 };
    case 'navbar3':
      return { ...state, navbar3: !state.navbar3 };
    case 'navbar4':
      return { ...state, navbar4: !state.navbar4 };
    case 'navbar5':
      return { ...state, navbar5: !state.navbar5 };
    case 'navbar6':
      return { ...state, navbar6: !state.navbar6 };
    case 'navbar7':
      return { ...state, navbar7: !state.navbar7 };
    case 'navbar8':
      return { ...state, navbar8: !state.navbar8 };
    case 'navbar9':
      return { ...state, navbar9: !state.navbar9 };
    case 'navbar10':
      return { ...state, navbar10: !state.navbar10 };
    case 'navbar11':
      return { ...state, navbar11: !state.navbar11 };

    default:
      return state;
  }
};

export default function NavBar() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Fragment>
      <PageTitle motherMenu={'Bootstrap'} activeMenu={'Navbar'} />
      <div className="row navbar-page">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Deafult Navbar</h4>
            </div>
            <div className="card-body navbar_content">
              <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                  <Link to={'#'} className="navbar-brand">
                    Navbar
                  </Link>
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => dispatch({ type: 'navbar1' })}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <Collapse in={state.navbar1}>
                    <div className="collpase navbar-collapse">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <Link to={'#'} className="nav-link active">
                            Home
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to={'#'} className="nav-link">
                            Link
                          </Link>
                        </li>
                        <Dropdown as="li" className="nav-item">
                          <Dropdown.Toggle
                            as="div"
                            className="nav-link dropdown-toggle"
                          >
                            Dropdown
                          </Dropdown.Toggle>
                          <Dropdown.Menu as="ul" align="end">
                            <li>
                              <Dropdown.Item>Action</Dropdown.Item>
                            </li>
                            <li>
                              <Dropdown.Item>Another action</Dropdown.Item>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <Dropdown.Item>Something else here</Dropdown.Item>
                            </li>
                          </Dropdown.Menu>
                        </Dropdown>
                        <li className="nav-item">
                          <a className="nav-link disabled" aria-disabled="true">
                            Disabled
                          </a>
                        </li>
                      </ul>
                      <form className="d-flex">
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button
                          className="btn btn-outline-success"
                          type="submit"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                  </Collapse>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Navbar Text</h4>
            </div>
            <div className="card-body navbar_content">
              <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                  <Link to={'#'} className="navbar-brand">
                    Navbar (As a link)
                  </Link>
                </div>
              </nav>
              <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                  <span className="navbar-brand mb-0 h1">
                    Navbar (As a heading)
                  </span>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Image and text </h4>
            </div>
            <div className="card-body navbar_content">
              <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                  <Link to={'#'} className="navbar-brand">
                    <img
                      src={logo}
                      alt="Logo"
                      width="30"
                      height="24"
                      className="d-inline-block align-text-top"
                    />{' '}
                    Bootstrap
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                {' '}
                Nav with lists, links and dropdowns{' '}
              </h4>
            </div>
            <div className="card-body navbar_content">
              <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                  <Link to={'#'} className="navbar-brand">
                    Navbar
                  </Link>
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => dispatch({ type: 'navbar2' })}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <Collapse in={state.navbar2}>
                    <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <Link to={'#'} className="nav-link active">
                            Home
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to={'#'} className="nav-link">
                            Features
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to={'#'} className="nav-link">
                            Pricing
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to={'#'} className="nav-link disabled">
                            Disabled
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </nav>

              <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                  <Link to={'#'} className="navbar-brand">
                    Navbar
                  </Link>
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => dispatch({ type: 'navbar3' })}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <Collapse in={state.navbar3}>
                    <div
                      className="collapse navbar-collapse"
                      id="navbarNavAltMarkup"
                    >
                      <div className="navbar-nav">
                        <Link to={'#'} className="nav-link active">
                          Home
                        </Link>
                        <Link to={'#'} className="nav-link">
                          Features
                        </Link>
                        <Link to={'#'} className="nav-link">
                          Pricing
                        </Link>
                        <Link to={'#'} className="nav-link disabled">
                          Disabled
                        </Link>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </nav>

              <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                  <Link to={'#'} className="navbar-brand">
                    Navbar
                  </Link>
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => dispatch({ type: 'navbar4' })}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <Collapse in={state.navbar4}>
                    <div
                      className="collapse navbar-collapse"
                      id="navbarNavDropdown"
                    >
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <Link to={'#'} className="nav-link active">
                            Home
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to={'#'} className="nav-link">
                            Features
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to={'#'} className="nav-link">
                            Pricing
                          </Link>
                        </li>
                        <Dropdown as="li" className="nav-item">
                          <Dropdown.Toggle as="div" className="nav-link">
                            Dropdown link
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <li>
                              <Dropdown.Item>Action</Dropdown.Item>
                            </li>
                            <li>
                              <Dropdown.Item>Another action</Dropdown.Item>
                            </li>
                            <li>
                              <Dropdown.Item>Something else here</Dropdown.Item>
                            </li>
                          </Dropdown.Menu>
                        </Dropdown>
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Forms Navbar</h4>
            </div>
            <div className="card-body navbar_content">
              <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-primary" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              </nav>

              <nav className="navbar bg-body-tertiary mb-4">
                <div className="container-fluid">
                  <a className="navbar-brand">Navbar</a>
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-primary" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              </nav>

              <h6 className="mb-3 fw-medium">Input groups in navbar forms</h6>
              <nav className="navbar bg-body-tertiary mb-4">
                <form className="container-fluid">
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon1">
                      @
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </form>
              </nav>

              <h6 className="mb-3 fw-medium">
                Various buttons are supported as part of these navbar forms
              </h6>
              <nav className="navbar bg-body-tertiary">
                <form className="container-fluid justify-content-start">
                  <button
                    className="btn btn-outline-success me-2"
                    type="button"
                  >
                    Main button
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    type="button"
                  >
                    Smaller button
                  </button>
                </form>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Navbar With text</h4>
            </div>
            <div className="card-body navbar_content">
              <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                  <span className="navbar-text text-black">
                    Navbar text with an inline element
                  </span>
                </div>
              </nav>

              <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                  <Link to={'#'} className="navbar-brand">
                    Navbar w/ text
                  </Link>
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => dispatch({ type: 'navbar5' })}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <Collapse in={state.navbar5}>
                    <div className="collapse navbar-collapse" id="navbarText">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <Link to={'#'} className="nav-link active">
                            Home
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to={'#'} className="nav-link">
                            Features
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to={'#'} className="nav-link">
                            Pricing
                          </Link>
                        </li>
                      </ul>
                      <span className="navbar-text text-black">
                        Navbar text with an inline element
                      </span>
                    </div>
                  </Collapse>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Color Schemes</h4>
            </div>
            <div className="card-body navbar_content">
              <nav
                className="navbar bg-dark border-bottom border-body"
                data-bs-theme="dark"
              >
                <div className="container-fluid">
                  <a className="navbar-brand">Navbar</a>
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                    />
                    <button className="btn btn-light" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              </nav>

              <nav className="navbar bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                  <a className="navbar-brand">Navbar</a>
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                    />
                    <button className="btn btn-light" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              </nav>

              <nav className="navbar" style={{ backgroundColor: '#e3f2fd' }}>
                <div className="container-fluid">
                  <a className="navbar-brand">Navbar</a>
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                    />
                    <button className="btn btn-light" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Navbar Container</h4>
            </div>
            <div className="card-body navbar_content">
              <div className="container">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                  <div className="container-fluid">
                    <Link to={'#'} className="navbar-brand">
                      Navbar
                    </Link>
                  </div>
                </nav>
              </div>
              <h6>
                Use any of the responsive containers to change how wide the
                content in your navbar is presented
              </h6>
              <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-md">
                  <Link to={'#'} className="navbar-brand">
                    Navbar
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Placement</h4>
            </div>
            <div className="card-body navbar_content">
              <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                  <Link to={'#'} className="navbar-brand">
                    Default
                  </Link>
                </div>
              </nav>
              <nav className="navbar fixed-top bg-body-tertiary">
                <div className="container-fluid">
                  <Link to={'#'} className="navbar-brand">
                    Fixed top
                  </Link>
                </div>
              </nav>
              <nav className="navbar fixed-bottom bg-body-tertiary">
                <div className="container-fluid">
                  <Link to={'#'} className="navbar-brand">
                    Fixed bottom
                  </Link>
                </div>
              </nav>
              <nav className="navbar sticky-top bg-body-tertiary">
                <div className="container-fluid">
                  <Link to={'#'} className="navbar-brand">
                    Sticky top
                  </Link>
                </div>
              </nav>
              <nav className="navbar sticky-bottom bg-body-tertiary">
                <div className="container-fluid">
                  <Link to={'#'} className="navbar-brand">
                    Sticky bottom
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Responsive Behaviour</h4>
            </div>
            <div className="card-body navbar_content">
              <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => dispatch({ type: 'navbar6' })}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <Collapse in={state.navbar6}>
                    <div
                      className="collapse navbar-collapse"
                      id="navbarTogglerDemo01"
                    >
                      <a className="navbar-brand" href="javascript:void(0);">
                        Hidden brand
                      </a>
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            aria-current="page"
                            href="javascript:void(0);"
                          >
                            Home
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="javascript:void(0);">
                            Link
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link disabled" aria-disabled="true">
                            Disabled
                          </a>
                        </li>
                      </ul>
                      <form className="d-flex" role="search">
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button
                          className="btn btn-outline-success"
                          type="submit"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                  </Collapse>
                </div>
              </nav>
              <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                  <a className="navbar-brand" href="javascript:void(0);">
                    Navbar
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => dispatch({ type: 'navbar7' })}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <Collapse in={state.navbar7}>
                    <div
                      className="collapse navbar-collapse"
                      id="navbarTogglerDemo02"
                    >
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            aria-current="page"
                            href="javascript:void(0);"
                          >
                            Home
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="javascript:void(0);">
                            Link
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link disabled" aria-disabled="true">
                            Disabled
                          </a>
                        </li>
                      </ul>
                      <form className="d-flex" role="search">
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button
                          className="btn btn-outline-success"
                          type="submit"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                  </Collapse>
                </div>
              </nav>
              <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => dispatch({ type: 'navbar8' })}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <Link to={'#'} className="navbar-brand">
                    Navbar
                  </Link>
                  <Collapse in={state.navbar8}>
                    <div
                      className="collapse navbar-collapse"
                      id="navbarTogglerDemo03"
                    >
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <Link
                            to={'#'}
                            className="nav-link active"
                            aria-current="page"
                          >
                            Home
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to={'#'} className="nav-link">
                            Link
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to={'#'}
                            className="nav-link disabled"
                            aria-disabled="true"
                          >
                            Disabled
                          </Link>
                        </li>
                      </ul>
                      <form className="d-flex" role="search">
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search"
                        />
                        <button
                          className="btn btn-outline-success"
                          type="submit"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                  </Collapse>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">External Content</h4>
            </div>
            <div className="card-body navbar_content">
              <Collapse in={state.navbar9}>
                <div
                  className="collapse"
                  id="navbarToggleExternalContent"
                  data-bs-theme="dark"
                >
                  <div className="bg-dark p-4">
                    <h5 className="text-body-emphasis h4">Collapsed content</h5>
                    <span className="text-body-secondary">
                      Toggleable via the navbar brand.
                    </span>
                  </div>
                </div>
              </Collapse>
              <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => dispatch({ type: 'navbar9' })}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Offcanvas</h4>
            </div>
            <div className="card-body navbar_content">
              <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                  <Link to={'#'} className="navbar-brand">
                    Offcanvas navbar
                  </Link>
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => dispatch({ type: 'navbar10' })}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <Offcanvas
                    className=" offcanvas-end"
                    show={state.navbar10}
                    placement="end"
                  >
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                        Offcanvas
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => dispatch({ type: 'navbar10' })}
                      ></button>
                    </div>
                    <div className="offcanvas-body">
                      <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            aria-current="page"
                            href="javascript:void(0);"
                          >
                            Home
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="javascript:void(0);">
                            Link
                          </a>
                        </li>
                        <li className="nav-item dropdown">
                          <a
                            className="nav-link dropdown-toggle"
                            href="javascript:void(0);"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Dropdown
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                              >
                                Action
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                              >
                                Another action
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                              >
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <form className="d-flex mt-3" role="search">
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button
                          className="btn btn-outline-success"
                          type="submit"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                  </Offcanvas>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Offcanvas</h4>
            </div>
            <div className="card-body navbar_content">
              <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                  <Link to={'#'} className="navbar-brand">
                    Offcanvas dark navbar
                  </Link>
                  <button
                    className="navbar-toggler"
                    onClick={() => dispatch({ type: 'navbar11' })}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <Offcanvas
                    className="offcanvas-end text-bg-dark"
                    show={state.navbar11}
                    placement="end"
                  >
                    <div className="offcanvas-header">
                      <h5
                        className="offcanvas-title"
                        id="offcanvasDarkNavbarLabel"
                      >
                        Dark offcanvas
                      </h5>
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={() => dispatch({ type: 'navbar11' })}
                      ></button>
                    </div>
                    <div className="offcanvas-body">
                      <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            aria-current="page"
                            href="javascript:void(0);"
                          >
                            Home
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="javascript:void(0);">
                            Link
                          </a>
                        </li>
                        <li className="nav-item dropdown">
                          <a
                            className="nav-link dropdown-toggle"
                            href="javascript:void(0);"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Dropdown
                          </a>
                          <ul className="dropdown-menu dropdown-menu-dark">
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                              >
                                Action
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                              >
                                Another action
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                              >
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <form className="d-flex mt-3" role="search">
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button className="btn btn-success" type="submit">
                          Search
                        </button>
                      </form>
                    </div>
                  </Offcanvas>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
