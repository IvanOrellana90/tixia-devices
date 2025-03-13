import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';

import BarChart7 from '../charts/Chartjs/bar7';
import BarChart8 from '../charts/Chartjs/bar8';
import RevenueChart from '../charts/Chartjs/RevenueChart';
import LineChart1 from '../charts/Chartjs/line1';
import { tradingItem } from '../../content/AllData';

import RealTime from '../charts/Chartjs/realtime2';
import CommanSelect from './CommanSelect';

const ApexPie4 = loadable(() =>
  pMinDelay(import('../charts/apexcharts/Pie4'), 1000)
);
const PieChart5 = loadable(() =>
  pMinDelay(import('../charts/apexcharts/Pie5'), 1000)
);

const Analytics = () => {
  return (
    <>
      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/analytics">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active">
            <Link to="/analytics">Analytics</Link>
          </li>
        </ol>
      </div>
      <div className="row">
        <div className="col-xl-6 col-xxl-6 col-lg-12 col-md-12 col-sm-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header border-0 pb-0 d-sm-flex d-block">
                  <h4 className="card-title mb-1">Trending Items</h4>
                  <Dropdown className="dropdown ms-auto text-end">
                    <Dropdown.Toggle
                      variant=""
                      className="btn-link icon-false p-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x={0} y={0} width={24} height={24} />
                          <circle fill="#000000" cx={12} cy={5} r={2} />
                          <circle fill="#000000" cx={12} cy={12} r={2} />
                          <circle fill="#000000" cx={12} cy={19} r={2} />
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <Dropdown.Item className="dropdown-item" to="/analytics">
                        View Detail
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item" to="/analytics">
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item" to="/analytics">
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="card-body pt-0 p-0">
                  {tradingItem.map((elem, i) => (
                    <div
                      className="align-items-center d-flex mx-0 border-bottom p-4"
                      key={i}
                    >
                      <span className="number col-2 col-sm-1 px-0 align-self-center fs-16 text-black d-none d-sm-inline-block">
                        {elem.id}
                      </span>
                      <div className="outline border rounded-circle p-3 me-3 d-none d-sm-inline-block">
                        <svg
                          class="primary-icon"
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.9042 5.18413L0.556031 16.5323C0.281453 16.8068 0.281453 17.2521 0.556031 17.5266L3.24911 20.2197C3.44481 20.4154 3.73705 20.4781 3.99582 20.3799C5.0289 19.9878 6.20067 20.2386 6.98098 21.0189C7.76129 21.7992 8.01214 22.971 7.62003 24.0041C7.52178 24.2628 7.5845 24.5551 7.78019 24.7508L10.4733 27.4439C10.7479 27.7185 11.1931 27.7185 11.4677 27.4439L22.8158 16.0958L11.9042 5.18413Z"
                            fill="var(--primary)"
                          ></path>
                          <path
                            d="M27.4439 10.4734L24.7508 7.78025C24.5551 7.58456 24.2628 7.52185 24.0041 7.62009C22.971 8.0122 21.7993 7.76132 21.019 6.98101C20.2386 6.2007 19.9878 5.02893 20.3799 3.99585C20.4781 3.73711 20.4154 3.44484 20.2197 3.24914L17.5266 0.556062C17.252 0.281484 16.8068 0.281484 16.5322 0.556062L12.8985 4.18975L23.8102 15.1014L27.4439 11.4677C27.7185 11.1932 27.7185 10.7479 27.4439 10.4734Z"
                            fill="var(--primary)"
                          ></path>
                        </svg>
                      </div>
                      <div className="col-sm-6 col-6 col-xxl-5 my-3 my-sm-0 px-0">
                        <h5 className="mt-0 mb-0">
                          <Link className="text-black" to="/events">
                            {elem.title}
                          </Link>
                        </h5>
                      </div>
                      <div className="ms-auto col-2 col-sm-2 px-0 d-flex align-self-center align-items-center">
                        <div className="text-center">
                          <h4 className="mb-0 d-block text-black">454</h4>
                          <span className="fs-14">Sales</span>
                        </div>
                      </div>
                      <div className="me-3">
                        <span
                          className="peity-success"
                          data-style="width:100%;"
                          style={{ display: 'none' }}
                        >
                          0,2,1,4
                        </span>
                        <svg
                          className="primary-icon"
                          width="26"
                          height="27"
                          viewBox="0 0 26 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="3.71426"
                            height="27"
                            rx="1.85713"
                            transform="matrix(-1 0 0 1 26 0)"
                            fill="var(--primary)"
                          ></rect>
                          <rect
                            width="3.71426"
                            height="19.6364"
                            rx="1.85713"
                            transform="matrix(-1 0 0 1 18.5723 7.36365)"
                            fill="var(--primary)"
                          ></rect>
                          <rect
                            width="3.71426"
                            height="8.59091"
                            rx="1.85713"
                            transform="matrix(-1 0 0 1 11.1436 18.4091)"
                            fill="var(--primary)"
                          ></rect>
                          <rect
                            width="4.19045"
                            height="16.6154"
                            rx="2.09522"
                            transform="matrix(-1 0 0 1 4.19043 10.3846)"
                            fill="var(--primary)"
                          ></rect>
                        </svg>
                      </div>
                      {elem.arrow === 'green' && (
                        <svg
                          width={22}
                          className="col-sm-1 col-2"
                          height={11}
                          viewBox="0 0 22 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 11L11 -4.72849e-07L22 11"
                            fill="#21B830"
                          />
                        </svg>
                      )}
                      {elem.arrow === 'red' && (
                        <svg
                          width={22}
                          height={11}
                          viewBox="0 0 22 11"
                          className="col-sm-1 col-2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 -9.61651e-07L11 11L22 0" fill="#FF2626" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card bg-warning">
                <div className="card-header border-0 pb-0 d-sm-flex d-block align-items-start">
                  <h2 className="mb-1 text-white fs-35 font-w600">
                    94%
                    <svg
                      width={22}
                      height={11}
                      viewBox="0 0 22 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 11L11 -4.72849e-07L22 11" fill="#fff" />
                    </svg>
                  </h2>
                  <div className="dropdown ms-auto text-end">
                    <h4 className="text-white">Sales Comparison</h4>
                    <span className="text-white font-w300">Than last day</span>
                  </div>
                </div>
                <div className="card-body p-2">
                  <BarChart7
                    backgroundColor={'#ffe600'}
                    backgroundColor2={['rgba(0, 0, 0, .04)']}
                    hoverBackgroundColor={'#f3db00'}
                    hoverBackgroundColor2={['rgba(0, 0, 0, .08)']}
                    height={217}
                    fontColor="#fff"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-sm-6">
              <div className="card overflow-hidden">
                <div className="card-header border-0 pb-0">
                  <div>
                    <h3 className="mb-0 text-black font-w600">$124,136</h3>
                    <p className="mb-1">Revenue</p>
                  </div>
                </div>
                <div className="card-body p-0  mt-widget">
                  <RevenueChart />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-sm-6">
              <div className="card overflow-hidden">
                <div className="card-header border-0 pb-0">
                  <div>
                    <h3 className="mb-0 text-black font-w600">639 Pcs</h3>
                    <p className="mb-1">Ticket Ordered</p>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="col-7 px-0 offset-5 mt-widget">
                    <BarChart8 />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-3 col-lg-6 col-md-6 col-sm-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h4 className="card-title">Revenue</h4>
                  <Dropdown className="dropdown ms-auto text-end ">
                    <Dropdown.Toggle
                      className="btn-link icon-false p-0"
                      variant=""
                      data-toggle="dropdown"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x={0} y={0} width={24} height={24} />
                          <circle fill="#000000" cx={12} cy={5} r={2} />
                          <circle fill="#000000" cx={12} cy={12} r={2} />
                          <circle fill="#000000" cx={12} cy={19} r={2} />
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <Dropdown.Item className="dropdown-item" to="/analytics">
                        View Detail
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item" to="/analytics">
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item" to="/analytics">
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="card-body">
                  <LineChart1 borderWidth="4" height={350} />
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header pb-0 border-0">
                  <div>
                    <h5 className="mb-0 text-black font-weight-bold">
                      456k Pcs
                    </h5>
                    <p className="fs-14 mb-0">Ticket Sold</p>
                  </div>
                  <CommanSelect />
                </div>
                <div className="card-body">
                  <div
                    className="progress mb-0"
                    style={{ height: 8, width: '100%' }}
                  >
                    <div
                      className="progress-bar bg-primary progress-animated"
                      style={{ width: '80%', height: 8 }}
                      role="progressbar"
                    >
                      <span className="sr-only">80% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header pb-0 border-0">
                  <div>
                    <h5 className="mb-0 text-black font-weight-bold">
                      Pie Chart
                    </h5>
                    <p className="fs-14 mb-0">Ticket Sold</p>
                  </div>
                  <CommanSelect />
                </div>
                <div className="card-body pt-2">
                  <PieChart5 />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-3 col-lg-6 col-md-6 col-sm-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <span className="me-4">
                      <svg
                        className="primary-icon"
                        width="50"
                        height="53"
                        viewBox="0 0 50 53"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="7.11688"
                          height="52.1905"
                          rx="3"
                          transform="matrix(-1 0 0 1 49.8184 0)"
                          fill="var(--primary)"
                        ></rect>
                        <rect
                          width="7.11688"
                          height="37.9567"
                          rx="3"
                          transform="matrix(-1 0 0 1 35.585 14.2338)"
                          fill="var(--primary)"
                        ></rect>
                        <rect
                          width="7.11688"
                          height="16.6061"
                          rx="3"
                          transform="matrix(-1 0 0 1 21.3516 35.5844)"
                          fill="var(--primary)"
                        ></rect>
                        <rect
                          width="8.0293"
                          height="32.1172"
                          rx="3"
                          transform="matrix(-1 0 0 1 8.0293 20.0732)"
                          fill="var(--primary)"
                        ></rect>
                      </svg>
                    </span>
                    <div className="media-body ms-1">
                      <p className="mb-1">Income</p>
                      <h4 className="mb-0 text-black font-w600">$126,000</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <span className="me-4">
                      <svg
                        class="primary-icon"
                        width="51"
                        height="31"
                        viewBox="0 0 51 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clip-rule="evenodd"
                          d="M49.3228 0.840214C50.7496 2.08096 50.9005 4.24349 49.6597 5.67035L34.6786 22.8987C32.284 25.6525 28.1505 26.0444 25.281 23.7898L18.1758 18.2072L5.77023 29.883C4.3933 31.1789 2.22651 31.1133 0.930578 29.7363C-0.365358 28.3594 -0.299697 26.1926 1.07723 24.8967L13.4828 13.2209C15.9494 10.8993 19.7428 10.7301 22.4063 12.8229L29.5115 18.4055L44.4926 1.1772C45.7334 -0.249661 47.8959 -0.400534 49.3228 0.840214Z"
                          fill="var(--primary)"
                        ></path>
                      </svg>
                    </span>
                    <div className="media-body ms-1">
                      <p className="mb-1">Customer</p>
                      <h4 className="mb-0 text-black font-w600">109,511</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
                  <div className="media align-items-center">
                    <span className="me-4">
                      <svg
                        class="primary-icon"
                        width="51"
                        height="52"
                        viewBox="0 0 51 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clip-rule="evenodd"
                          d="M25.5 43C34.8888 43 42.5 35.3888 42.5 26C42.5 16.6112 34.8888 9 25.5 9C16.1112 9 8.5 16.6112 8.5 26C8.5 35.3888 16.1112 43 25.5 43ZM25.5 51.5C39.5833 51.5 51 40.0833 51 26C51 11.9167 39.5833 0.5 25.5 0.5C11.4167 0.5 0 11.9167 0 26C0 40.0833 11.4167 51.5 25.5 51.5Z"
                          fill="white"
                          fill-opacity="0.18"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clip-rule="evenodd"
                          d="M33.9997 1.95836C31.2809 0.997147 28.4073 0.5 25.4997 0.5V8.86605C28.5687 8.86605 31.5815 9.6904 34.223 11.253C36.8645 12.8155 39.0379 15.0589 40.5159 17.7486C41.9939 20.4384 42.7223 23.4757 42.625 26.5433C42.5277 29.6108 41.6082 32.5959 39.9627 35.1866C38.3172 37.7772 36.006 39.8783 33.2707 41.2703C30.5355 42.6623 27.4766 43.294 24.4136 43.0995C21.3507 42.905 18.3963 41.8913 15.8591 40.1645C13.3219 38.4376 11.2952 36.061 9.99062 33.283L2.41797 36.8391C3.65388 39.4709 5.32535 41.8607 7.35106 43.9131C8.50759 45.0848 9.77958 46.1466 11.1519 47.0806C14.9279 49.6506 19.3249 51.1592 23.8834 51.4487C28.4418 51.7382 32.9943 50.798 37.0652 48.7264C41.136 46.6548 44.5756 43.5277 47.0246 39.6721C49.4736 35.8165 50.842 31.3739 50.9868 26.8085C51.1317 22.2432 50.0476 17.7228 47.8479 13.7197C45.6482 9.71663 42.4137 6.37787 38.4824 4.05236C37.0536 3.2072 35.5519 2.50715 33.9997 1.95836Z"
                          fill="var(--primary)"
                        ></path>
                      </svg>
                    </span>
                    <div className="media-body ms-1">
                      <p className="mb-1">Last Than Year</p>
                      <div className="d-flex align-items-center">
                        <h4 className="mb-0 me-3 text-black font-w600">59%</h4>
                        <svg
                          width="29"
                          height="15"
                          viewBox="0 0 29 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 15L14.5 -1.27353e-06L29 15"
                            fill="var(--primary)"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h4 className="card-title">Sales Summary</h4>
                  <Dropdown className="btn-group">
                    <Dropdown.Toggle
                      className="btn btn-light btn-sm tp-btn dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                    >
                      This Week
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-right">
                      <Dropdown.Item className="dropdown-item" to="/analytics">
                        This Week
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item" to="/analytics">
                        Next Week
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="card-body pt-2">
                  <div className="border p-3 d-flex justify-content-between fs-14 rounded-lg mb-4">
                    <span className="text-black">Tuesday</span>
                    <span className="text-black">215,523 pcs</span>
                  </div>
                  <div className="text-center">
                    <ApexPie4 />
                  </div>
                  <div className="row mx-0">
                    <div className="col-6 px-0 d-flex align-items-center mb-3">
                      <div
                        className="bg-primary rounded me-3 d-block"
                        style={{ width: 25, height: 25 }}
                      />
                      <div>
                        <h5 className="mb-1 text-black">VIP</h5>
                        <span>30%</span>
                      </div>
                    </div>
                    <div className="col-6 px-0 d-flex align-items-center mb-3">
                      <div
                        className="bg-success rounded me-3 d-block"
                        style={{ width: 25, height: 25 }}
                      />
                      <div>
                        <h5 className="mb-1 text-black">Exclusive</h5>
                        <span>24%</span>
                      </div>
                    </div>
                    <div className="col-6 px-0 d-flex align-items-center">
                      <div
                        className="bg-warning rounded me-3 d-block"
                        style={{ width: 25, height: 25 }}
                      />
                      <div>
                        <h5 className="mb-1 text-black">Reguler</h5>
                        <span>30%</span>
                      </div>
                    </div>
                    <div className="col-6 px-0 d-flex align-items-center">
                      <div
                        className="bg-secondary rounded me-3 d-block"
                        style={{ width: 25, height: 25 }}
                      />
                      <div>
                        <h5 className="mb-1 text-black">Economic</h5>
                        <span>2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card overflow-hidden">
                <div className="card-header border-0 pb-2">
                  <div>
                    <h3 className="mb-0 text-black font-w600">2%</h3>
                    <p className="mb-1">Ticket Refunded</p>
                  </div>
                </div>
                <div className="card-body p-0">
                  <RealTime />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
