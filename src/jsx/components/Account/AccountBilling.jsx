import { Fragment } from 'react';
import PageTitle from '../../layouts/PageTitle';
import AccountDefaultCard from './Account/AccountDefaultCard';
import { IMAGES } from '../../content/theme';
import { Link } from 'react-router-dom';
import { Nav, Tab } from 'react-bootstrap';

const paymentBlog = [
  {
    image: IMAGES.CardJpg1,
    title: 'Marcus Morris',
    cardname: 'Card expires at 09/28',
    cardnumber: 'Visa **** 1679',
    expire: '',
  },
  {
    image: IMAGES.CardJpg1,
    title: 'Marcus Morris',
    cardname: 'Card expires at 09/27',
    cardnumber: 'Visa **** 1679',
    expire: '',
  },
  {
    image: IMAGES.CardJpg2,
    title: 'Jason Davis',
    cardname: 'Card expires at 02/26',
    cardnumber: 'Mastercard **** 2704',
    expire: '',
  },
  {
    image: IMAGES.CardJpg2,
    title: 'Jason Davis',
    cardname: 'Card expires at 02/26',
    cardnumber: 'Mastercard **** 2704',
    expire: '',
  },
];

const addressBlog = [
  { id: 1111, name: 'Address 2' },
  { id: 1112, name: 'Address 3' },
  { id: 1113, name: 'Address 4' },
];
function AccountBilling() {
  return (
    <Fragment>
      <PageTitle activeMenu={'Billing'} motherMenu={'Account'} />
      <div className="card profile-overview">
        <AccountDefaultCard activePage={'billing'} />
      </div>
      <div className="tab-content" id="tabContentMyProfileBottom">
        <div className="row">
          <div className="col-xl-6">
            <div className="card">
              <div className="card-body">
                <div className="alert alert-warning border-warning outline-dashed py-3 px-3 mt-1 mb-4 mb-0 text-dark d-flex align-items-center">
                  <div className="clearfix">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 30C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 11.0218 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9782 0 15 0C11.0218 0 7.20644 1.58035 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 18.9782 1.58035 22.7936 4.3934 25.6066C7.20644 28.4196 11.0218 30 15 30ZM12.6562 19.6875H14.0625V15.9375H12.6562C11.877 15.9375 11.25 15.3105 11.25 14.5312C11.25 13.752 11.877 13.125 12.6562 13.125H15.4688C16.248 13.125 16.875 13.752 16.875 14.5312V19.6875H17.3438C18.123 19.6875 18.75 20.3145 18.75 21.0938C18.75 21.873 18.123 22.5 17.3438 22.5H12.6562C11.877 22.5 11.25 21.873 11.25 21.0938C11.25 20.3145 11.877 19.6875 12.6562 19.6875ZM15 7.5C15.4973 7.5 15.9742 7.69754 16.3258 8.04918C16.6775 8.40081 16.875 8.87772 16.875 9.375C16.875 9.87228 16.6775 10.3492 16.3258 10.7008C15.9742 11.0525 15.4973 11.25 15 11.25C14.5027 11.25 14.0258 11.0525 13.6742 10.7008C13.3225 10.3492 13.125 9.87228 13.125 9.375C13.125 8.87772 13.3225 8.40081 13.6742 8.04918C14.0258 7.69754 14.5027 7.5 15 7.5Z"
                        fill="#FF8A11"
                      ></path>
                    </svg>
                  </div>
                  <div className="mx-3">
                    <h6 className="mb-0 fw-semibold">
                      We need your attention!
                    </h6>
                    <p className="mb-0">
                      Your Payment was declined. To start using tools, please{' '}
                      <Link to={'#'} className="text-warning">
                        Add Payment Method
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="border border-secondary border-opacity-10 rounded p-3">
                      <h6 className="fs-14 mb-2">Remaining Account Credits</h6>
                      <p className="fs-13 mb-2">
                        We will send you a notification soon.{' '}
                        <Link to={'#'} className="text-primary d-block">
                          Make Action Here
                        </Link>
                      </p>
                      <span className="h6 mb-0">$136.00</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="border border-secondary border-opacity-10 rounded p-3">
                      <h6 className="fs-14">
                        Estimated Cost for Billing Period
                      </h6>
                      <p className="fs-13 mb-2">
                        We will send you a notification upon Subscription
                        expiration
                      </p>
                      <span className="h6 mb-0">$52.00</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="border border-secondary border-opacity-10 rounded p-3">
                      <h6 className="fs-14">Current Service Usage</h6>
                      <div
                        className="progress my-3"
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className="progress-bar rounded-0"
                          style={{ width: '60%' }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Team Users</span>
                        <span className="h6">57 of 100 Used</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="border border-secondary border-opacity-10 rounded p-3 h-100">
                      <h6 className="fs-14">Billing Alerts</h6>
                      <p className="fs-13 mb-2">
                        Create alerts to notify you on Billing.{' '}
                        <Link to={'#'} className="text-primary">
                          My Alerts Here
                        </Link>
                      </p>
                      <span className="badge badge-sm badge-success light border-0">
                        New Alert
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center mt-4">
                  <div className="col-lg-6 col-md-7">
                    <h6 className="fs-13 mb-1">
                      Bob Marley{' '}
                      <span className="text-muted">
                        Is your last bill payer
                      </span>
                    </h6>
                    <p className="mb-0 fs-13">
                      Extended Pro Package. Up to 100 Agents & 25 Projects. Make
                      your business effective
                    </p>
                  </div>
                  <div className="col-lg-6 col-md-5 text-md-end mt-3 mt-md-0">
                    <Link to={'#'} className="btn btn-danger my-1 light">
                      Cancel Subcription
                    </Link>
                    <Link to={'#'} className="btn btn-primary my-1 ms-2">
                      Upgrade Plan
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h4 className="heading mb-0">Payment Methods</h4>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  {paymentBlog.map((elem, index) => (
                    <div className="col-sm-6" key={index}>
                      <div className="border border-secondary border-opacity-10 rounded p-3">
                        <h6 className="fs-14 mb-3">
                          {elem.title}{' '}
                          <span className="badge badge-sm badge-success light border-0 ms-2">
                            New
                          </span>
                        </h6>
                        <div className="d-flex align-items-center mb-3">
                          <div className="clearfix me-2">
                            <img src={elem.image} alt="" />
                          </div>
                          <div className="clearfix">
                            <h6 className="fs-13 mb-1">{elem.cardnumber}</h6>
                            <p className="fs-13 mb-0">{elem.cardname}</p>
                          </div>
                        </div>
                        <Link to={'#'} className="btn btn-xxs btn-danger light">
                          Delete
                        </Link>{' '}
                        <Link to={'#'} className="btn btn-xxs btn-info light">
                          Edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row align-items-center mt-4">
                  <div className="col-lg-6 col-md-7">
                    <h6 className="fs-13 mb-1">
                      You have 2 active cards.{' '}
                      <span className="text-muted">Another 3 are inactive</span>
                    </h6>
                    <p className="mb-0 fs-13">
                      Extended Pro Package. Up to 100 Agents & 25 Projects. Make
                      your business effective
                    </p>
                  </div>
                  <div className="col-lg-6 col-md-5 text-md-end mt-3 mt-md-0">
                    <Link to={'#'} className="btn btn-light my-1">
                      Action
                    </Link>
                    <Link to={'#'} className="btn btn-primary my-1 ms-2">
                      Add New Card
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h4 className="heading mb-0">Billing Addresses</h4>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="border border-secondary border-opacity-10 rounded p-3">
                      <h6 className="fs-14">
                        Address 1{' '}
                        <span className="badge badge-sm badge-success light border-0 ms-2">
                          New
                        </span>
                      </h6>
                      <p className="fs-13">
                        Ap #285-7193 Ullamcorper Avenue Amesbury HI 93373 United
                        States
                      </p>
                      <Link to={'#'} className="btn btn-xxs btn-danger light">
                        Delete
                      </Link>{' '}
                      <Link to={'#'} className="btn btn-xxs btn-info light">
                        Edit
                      </Link>
                    </div>
                  </div>
                  {addressBlog.map((item, ind) => (
                    <div className="col-sm-6" key={ind}>
                      <div
                        className="border border-secondary border-opacity-10 rounded p-3"
                        key={ind}
                      >
                        <h6 className="fs-14">{item.name}</h6>
                        <p className="fs-13">
                          Ap #285-7193 Ullamcorper Avenue Amesbury HI 93373
                          United States
                        </p>
                        <Link to={'#'} className="btn btn-xxs btn-danger light">
                          Delete
                        </Link>{' '}
                        <Link to={'#'} className="btn btn-xxs btn-info light">
                          Edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row align-items-center mt-4">
                  <div className="col-md-6">
                    <h6 className="fs-14 mb-0">Tax Location</h6>
                    <p className="mb-0">
                      United States - 10% VAT{' '}
                      <Link to={'#'} className="text-primary">
                        More Info
                      </Link>
                    </p>
                  </div>
                  <div className="col-md-6 text-md-end mt-3 mt-md-0">
                    <Link to={'#'} className="btn btn-primary">
                      Add New Address
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card h-auto">
              <Tab.Container defaultActiveKey={'Week'}>
                <div className="card-header border-0 py-3 d-block d-sm-flex pb-0">
                  <h4 className="heading mb-0">Billing History</h4>
                  <Nav
                    as="ul"
                    className="nav nav-pills mt-3 mt-sm-0"
                    id="myTabBillingHistory"
                    role="tablist"
                  >
                    <Nav.Item as="li" className="nav-item ms-1">
                      <Nav.Link
                        as="button"
                        className="btn btn-light btn-sm"
                        eventKey={'Week'}
                      >
                        Week
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-item ms-1">
                      <Nav.Link
                        as="button"
                        className="btn btn-light btn-sm"
                        eventKey={'Month'}
                      >
                        Month
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-item ms-1">
                      <Nav.Link
                        as="button"
                        className="btn btn-light btn-sm"
                        eventKey={'Year'}
                      >
                        Year
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-item ms-1">
                      <Nav.Link
                        as="button"
                        className="btn btn-light btn-sm"
                        eventKey={'All'}
                      >
                        All
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
                <div className="card-body">
                  <Tab.Content className="tab-content">
                    <Tab.Pane eventKey={'Week'}>
                      <div className="table-responsive">
                        <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Description</th>
                              <th>Amount</th>
                              <th className="text-end">Invoice</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Nov 01, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for Ocrober 2024
                                </span>
                              </td>
                              <td>$123.79</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Oct 08, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for September 2024
                                </span>
                              </td>
                              <td>$98.03</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Aug 24, 2024</td>
                              <td>Paypal</td>
                              <td>$35.07</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Aug 01, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for July 2024
                                </span>
                              </td>
                              <td>$142.80</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Jul 01, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for June 2024
                                </span>
                              </td>
                              <td>$123.79</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Jun 17, 2024</td>
                              <td>Paypal</td>
                              <td>$23.09</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey={'Month'}>
                      <div className="table-responsive">
                        <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Description</th>
                              <th>Amount</th>
                              <th className="text-end">Invoice</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Nov 01, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for Ocrober 2024
                                </span>
                              </td>
                              <td>$123.79</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Aug 24, 2024</td>
                              <td>Paypal</td>
                              <td>$35.07</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Aug 01, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for July 2024
                                </span>
                              </td>
                              <td>$142.80</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Jul 01, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for June 2024
                                </span>
                              </td>
                              <td>$123.79</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Jun 01, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for May 2024
                                </span>
                              </td>
                              <td>$123.79</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey={'Year'}>
                      <div className="table-responsive">
                        <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Description</th>
                              <th>Amount</th>
                              <th className="text-end">Invoice</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Nov 01, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for Ocrober 2024
                                </span>
                              </td>
                              <td>$123.79</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Aug 24, 2024</td>
                              <td>Paypal</td>
                              <td>$35.07</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Aug 01, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for July 2024
                                </span>
                              </td>
                              <td>$142.80</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Jul 01, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for June 2024
                                </span>
                              </td>
                              <td>$123.79</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Jun 17, 2024</td>
                              <td>Paypal</td>
                              <td>$23.09</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey={'All'}>
                      <div className="table-responsive">
                        <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Description</th>
                              <th>Amount</th>
                              <th className="text-end">Invoice</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Nov 01, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for Ocrober 2024
                                </span>
                              </td>
                              <td>$123.79</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Oct 08, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for September 2024
                                </span>
                              </td>
                              <td>$98.03</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Aug 01, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for July 2024
                                </span>
                              </td>
                              <td>$142.80</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Jul 01, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for June 2024
                                </span>
                              </td>
                              <td>$123.79</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Jun 17, 2024</td>
                              <td>Paypal</td>
                              <td>$23.09</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>Jun 01, 2024</td>
                              <td>
                                <span className="text-primary">
                                  Invoice for May 2024
                                </span>
                              </td>
                              <td>$123.79</td>
                              <td className="text-end">
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light"
                                >
                                  PDF
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-xxs btn-light ms-2"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default AccountBilling;
