import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import InboxMessage from './InboxMessage';
import { Dropdown } from 'react-bootstrap';
import PageTitle from '../../../../layouts/PageTitle';

const Messages = [
  {
    text: 'Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
  {
    text: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of',
    time: '11.49 am',
    icon: 'fa fa-star',
  },
];
const Inbox = () => {
  const [openMailBar, setOpenMailBar] = useState();
  return (
    <Fragment>
      <PageTitle activeMenu="Inbox" motherMenu="Email" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div
                  className={`col-lg-3 email-left-body ${openMailBar ? 'active' : ' '}`}
                >
                  <div className="email-left-box  generic-width">
                    <div className="p-0">
                      <Link
                        to="/email-compose"
                        className="btn btn-primary btn-block"
                      >
                        Compose
                      </Link>
                    </div>
                    <div className="mail-list mt-4">
                      <Link
                        to="/email-inbox"
                        className="list-group-item active"
                      >
                        <i className="fa fa-inbox font-18 align-middle me-2" />
                        Inbox
                        <span className="badge badge-danger light badge-sm float-end">
                          198
                        </span>
                      </Link>
                      <Link to="/email-inbox" className="list-group-item">
                        <i className="fa fa-paper-plane font-18 align-middle me-2"></i>
                        Sent
                      </Link>
                      <Link to="/email-inbox" className="list-group-item">
                        <i className="fa fa-star font-18 align-middle me-2"></i>
                        Important
                        <span className="badge badge-danger text-white badge-sm float-end">
                          47
                        </span>
                      </Link>
                      <Link to="/email-inbox" className="list-group-item">
                        <i className="mdi mdi-file-document-box font-18 align-middle me-2"></i>
                        Draft
                      </Link>
                      <Link to="/email-inbox" className="list-group-item">
                        <i className="fa fa-trash font-18 align-middle me-2"></i>
                        Trash
                      </Link>
                    </div>
                    <div className="mail-list overflow-hidden mt-4">
                      <div className="intro-title d-flex my-0 justify-content-between">
                        <h5>Categories</h5>
                      </div>
                      <Link to="/email-inbox" className="list-group-item">
                        <span className="icon-warning">
                          <i className="fa fa-circle"></i>
                        </span>
                        Work
                      </Link>
                      <Link to="/email-inbox" className="list-group-item">
                        <span className="icon-primary">
                          <i className="fa fa-circle"></i>
                        </span>
                        Private
                      </Link>
                      <Link to="/email-inbox" className="list-group-item">
                        <span className="icon-success">
                          <i className="fa fa-circle"></i>
                        </span>
                        Support
                      </Link>
                      <Link to="/email-inbox" className="list-group-item">
                        <span className="icon-dpink">
                          <i className="fa fa-circle" />
                        </span>
                        Social
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="email-right-box">
                    <div
                      role="toolbar"
                      className="toolbar d-flex align-items-center mt-4"
                    >
                      <div className="btn-group mb-1">
                        <div className="form-check custom-checkbox ms-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="checkbox1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="checkbox1"
                          ></label>
                        </div>
                      </div>
                      <div className="btn-group mb-1">
                        <button
                          className="btn btn-primary light px-3"
                          type="button"
                        >
                          <i className="ti-reload" />
                        </button>
                      </div>

                      <Dropdown className="btn-group mb-1 mx-2">
                        <Dropdown.Toggle
                          className="btn btn-primary px-3 light dropdown-toggle ms-1"
                          type="button"
                        >
                          More <span className="caret"></span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item to="/email-inbox">
                            Mark as Unread
                          </Dropdown.Item>
                          <Dropdown.Item to="/email-inbox">
                            Add to Tasks
                          </Dropdown.Item>
                          <Dropdown.Item to="/email-inbox">
                            Add Star
                          </Dropdown.Item>
                          <Dropdown.Item to="/email-inbox">Mute</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <div
                        className={`email-tools-box  ${openMailBar ? 'active' : ' '}`}
                        onClick={() => setOpenMailBar(!openMailBar)}
                      >
                        <i className="fa-solid fa-list-ul" />
                      </div>
                      <form className="form-head style-1 d-none d-sm-block ms-auto">
                        <div className="input-group search-area ms-auto w-100 d-inline-flex">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search here"
                          />
                          <span className="input-group-text">
                            <button className="bg-transparent border-0">
                              <svg
                                className="ms-1"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M23.7871 22.7761L17.9548 16.9437C19.5193 15.145 20.4665 12.7982 20.4665 10.2333C20.4665 4.58714 15.8741 0 10.2333 0C4.58714 0 0 4.59246 0 10.2333C0 15.8741 4.59246 20.4665 10.2333 20.4665C12.7982 20.4665 15.145 19.5193 16.9437 17.9548L22.7761 23.7871C22.9144 23.9255 23.1007 24 23.2816 24C23.4625 24 23.6488 23.9308 23.7871 23.7871C24.0639 23.5104 24.0639 23.0528 23.7871 22.7761ZM1.43149 10.2333C1.43149 5.38004 5.38004 1.43681 10.2279 1.43681C15.0812 1.43681 19.0244 5.38537 19.0244 10.2333C19.0244 15.0812 15.0812 19.035 10.2279 19.035C5.38004 19.035 1.43149 15.0865 1.43149 10.2333Z"
                                  fill="#3B4CB8"
                                ></path>
                              </svg>
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                    <div className="email-list mt-3">
                      {/** Single Message */}
                      {Messages.map((message, index) => (
                        <InboxMessage
                          key={index}
                          id={index}
                          message={message}
                        ></InboxMessage>
                      ))}
                    </div>
                    <div className="row mt-4">
                      <div className="col-12 ps-3">
                        <nav>
                          <ul className="pagination pagination-gutter pagination-primary pagination-sm no-bg">
                            <li className="page-item page-indicator">
                              <Link className="page-link" to="/email-inbox">
                                <i className="la la-angle-left"></i>
                              </Link>
                            </li>
                            <li className="page-item ">
                              <Link className="page-link" to="/email-inbox">
                                1
                              </Link>
                            </li>
                            <li className="page-item active">
                              <Link className="page-link" to="/email-inbox">
                                2
                              </Link>
                            </li>
                            <li className="page-item">
                              <Link className="page-link" to="/email-inbox">
                                3
                              </Link>
                            </li>
                            <li className="page-item">
                              <Link className="page-link" to="/email-inbox">
                                4
                              </Link>
                            </li>
                            <li className="page-item page-indicator">
                              <Link className="page-link" to="/email-inbox">
                                <i className="la la-angle-right"></i>
                              </Link>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Inbox;
