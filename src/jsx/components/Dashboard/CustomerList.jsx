import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CustomerTableData } from '../../content/AllData';

const CustomerList = () => {
  const [data, setData] = useState(
    document.querySelectorAll('#customerList_1 tbody tr')
  );
  const sort = 10;
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove('d-none');
      } else {
        data[i].classList.add('d-none');
      }
    }
  };
  // use effect
  useEffect(() => {
    setData(document.querySelectorAll('#customerList_1 tbody tr'));
    chackboxFun();
  }, [test]);

  activePag.current === 0 && chageData(0, sort);
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };
  const chackbox = document.querySelectorAll('.sorting_1 input');
  const motherChackBox = document.querySelector('.sorting_asc input');
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === 'all') {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };
  return (
    <>
      <div className="row mb-5 align-items-center">
        <div className="col-xl-3 mb-4 mb-xl-0">
          <Link
            to="/add-customers"
            className="btn btn-primary light btn-lg d-block rounded shadow px-2"
          >
            + New Customer
          </Link>
        </div>
        <div className="col-xl-9">
          <div className="card m-0 ">
            <div className="card-body py-3 py-md-2">
              <div className="row align-items-center">
                <div className="col-md-5 mb-3 mb-md-0">
                  <div className="media align-items-center">
                    <span className="me-2">
                      <svg
                        width="24"
                        height="24"
                        className="user-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0)">
                          <path
                            d="M21 24H3C2.73478 24 2.48043 23.8946 2.29289 23.7071C2.10536 23.5196 2 23.2652 2 23V22.008C2.00287 20.4622 2.52021 18.9613 3.47044 17.742C4.42066 16.5227 5.74971 15.6544 7.248 15.274C7.46045 15.2219 7.64959 15.1008 7.78571 14.9296C7.92182 14.7583 7.9972 14.5467 8 14.328V13.322L6.883 12.206C6.6032 11.9313 6.38099 11.6036 6.22937 11.2419C6.07776 10.8803 5.99978 10.4921 6 10.1V5.96201C6.01833 4.41693 6.62821 2.93765 7.70414 1.82861C8.78007 0.719572 10.2402 0.0651427 11.784 5.16174e-06C12.5992 -0.00104609 13.4067 0.158488 14.1603 0.469498C14.9139 0.780509 15.5989 1.2369 16.1761 1.81263C16.7533 2.38835 17.2114 3.07213 17.5244 3.82491C17.8373 4.5777 17.999 5.38476 18 6.20001V10.1C17.9997 10.4949 17.9204 10.8857 17.7666 11.2495C17.6129 11.6132 17.388 11.9426 17.105 12.218L16 13.322V14.328C16.0029 14.5469 16.0784 14.7586 16.2147 14.9298C16.351 15.1011 16.5404 15.2221 16.753 15.274C18.251 15.6548 19.5797 16.5232 20.5298 17.7424C21.4798 18.9617 21.997 20.4624 22 22.008V23C22 23.2652 21.8946 23.5196 21.7071 23.7071C21.5196 23.8946 21.2652 24 21 24ZM4 22H20C19.9954 20.8996 19.6249 19.8319 18.9469 18.9651C18.2689 18.0983 17.3219 17.4816 16.255 17.212C15.6125 17.0494 15.0423 16.6779 14.6341 16.1558C14.2259 15.6337 14.0028 14.9907 14 14.328V12.908C14.0001 12.6428 14.1055 12.3885 14.293 12.201L15.703 10.792C15.7965 10.7026 15.8711 10.5952 15.9221 10.4763C15.9731 10.3574 15.9996 10.2294 16 10.1V6.20001C16.0017 5.09492 15.5671 4.03383 14.7907 3.24737C14.0144 2.46092 12.959 2.01265 11.854 2.00001C10.8264 2.04117 9.85379 2.47507 9.1367 3.21225C8.41962 3.94943 8.01275 4.93367 8 5.96201V10.1C7.99979 10.2266 8.0249 10.352 8.07384 10.4688C8.12278 10.5856 8.19458 10.6914 8.285 10.78L9.707 12.2C9.89455 12.3875 9.99994 12.6418 10 12.907V14.327C9.99724 14.9896 9.77432 15.6325 9.3663 16.1545C8.95827 16.6766 8.3883 17.0482 7.746 17.211C6.67872 17.4804 5.73137 18.0972 5.05318 18.9642C4.37498 19.8313 4.00447 20.8993 4 22Z"
                            fill="#222fb9"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <div className="media-body ms-1">
                      <p className="mb-0 fs-14">Total Customer</p>
                      <h3 className="mb-0 text-black font-w600 fs-16">
                        129.000 Person
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 text-md-end">
                  <Link
                    to={'#'}
                    className="btn btn-outline-primary rounded btn-xs px-4"
                  >
                    Active
                  </Link>
                  <Link
                    to={'#'}
                    className="btn btn-secondary rounded ms-2 btn-xs px-4"
                  >
                    Edit
                  </Link>
                  <Link
                    to={'#'}
                    className="btn btn-danger rounded ms-2 btn-xs xs-4"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <div id="customerList_1" className="dataTables_wrapper no-footer">
              <table
                id="example5"
                className="table display mb-4 dataTablesCard fs-14 dataTable no-footer"
              >
                <thead>
                  <tr role="row">
                    <th className="sorting_asc">
                      <div className="form-check custom-checkbox">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox1"
                          required=""
                          onClick={() => chackboxFun('all')}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customCheckBox1"
                        ></label>
                      </div>
                    </th>
                    <th>Cust.Id</th>
                    <th>Date Join</th>
                    <th>Customer Name</th>
                    <th>Ticket Ordered</th>
                    <th>Location</th>
                    <th>Last Order</th>
                    <th>Total Spent</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {CustomerTableData.map((ele, index) => (
                    <tr role="row" className="odd" key={index}>
                      <td className="sorting_1">
                        <div className="form-check custom-checkbox">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox2"
                            required
                            onClick={() => chackboxFun()}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox2"
                          />
                        </div>
                      </td>
                      <td>{ele.id}</td>
                      <td>{ele.date}</td>
                      <td>{ele.name}</td>
                      <td>{ele.event}</td>
                      <td>{ele.location}</td>
                      <td>{ele.timestamp}</td>
                      <td className="text-primary font-w500">{ele.price}</td>
                      <td>
                        <div className="d-flex">
                          <Link
                            to={'#'}
                            className="btn btn-primary shadow btn-xs sharp me-1"
                          >
                            <i className="fas fa-pencil-alt" />
                          </Link>
                          <Link
                            to={'#'}
                            className="btn btn-danger shadow btn-xs sharp"
                          >
                            <i className="fa fa-trash" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-sm-flex text-center justify-content-between">
                <div className="dataTables_info">
                  Showing {activePag.current * sort + 1} to{' '}
                  {data.length > (activePag.current + 1) * sort
                    ? (activePag.current + 1) * sort
                    : data.length}{' '}
                  of {data.length} entries
                </div>
                <div
                  className="dataTables_paginate paging_simple_numbers"
                  id="example5_paginate"
                >
                  <Link
                    className="paginate_button previous disabled"
                    to="#"
                    onClick={() =>
                      activePag.current > 0 && onClick(activePag.current - 1)
                    }
                  >
                    <i className="fa fa-angle-double-left" />
                  </Link>
                  <span>
                    {paggination.map((number, i) => (
                      <Link
                        key={i}
                        to="#"
                        className={`paginate_button  ${
                          activePag.current === i ? 'current' : ''
                        } ${i > 0 ? 'ms-1' : ''}`}
                        onClick={() => onClick(i)}
                      >
                        {number}
                      </Link>
                    ))}
                  </span>
                  <Link
                    className="paginate_button next"
                    to="#"
                    onClick={() =>
                      activePag.current + 1 < paggination.length &&
                      onClick(activePag.current + 1)
                    }
                  >
                    <i className="fa fa-angle-double-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerList;
