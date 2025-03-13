import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import PageTitle from '../../layouts/PageTitle';
import { AllTicketData } from '../../content/AllData';

const count = [
  { label: '10', value: '0' },
  { label: '25', value: '1' },
  { label: '50', value: '2' },
  { label: '100', value: '3' },
];

const theadData = [
  { heading: 'User', sortingVale: 'role' },
  { heading: 'Title', sortingVale: 'location' },
  { heading: 'Priority', sortingVale: 'age' },
  { heading: 'Category', sortingVale: 'description' },
  { heading: 'Date', sortingVale: 'startDate' },
  { heading: 'Status', sortingVale: 'status' },
  { heading: 'Assign To', sortingVale: 'action' },
  { heading: 'Last Reply', sortingVale: 'timeElapsed' },
];

export default function AllTicket() {
  const [sort, setSortData] = useState('10');
  const [data, setData] = useState(
    document.querySelectorAll('#ticketList_1 tbody tr')
  );
  // const sort = dateSort;
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove('d-none');
      } else {
        data[i].classList.add('d-none');
      }
    }
  };
  useEffect(() => {
    setData(document.querySelectorAll('#ticketList_1 tbody tr'));
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
  const chackboxFun = (type) => {
    setTimeout(() => {
      const chackbox = document.querySelectorAll('.sorting_1 input');
      const motherChackBox = document.querySelector('.sorting_asc input');
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
    }, 100);
  };

  const [marketData, setMarketData] = useState([...AllTicketData]);
  const [iconData, setIconDate] = useState({ complete: false, ind: Number });
  function SotingData(name) {
    const sortedPeople = [...marketData];
    switch (name) {
      case 'role':
        sortedPeople.sort((a, b) => {
          return iconData.complete
            ? a.role.localeCompare(b.role)
            : b.role.localeCompare(a.role);
        });
        break;
      case 'location':
        sortedPeople.sort((a, b) => {
          return iconData.complete
            ? a.location.localeCompare(b.location)
            : b.location.localeCompare(a.location);
        });
        break;
      case 'age':
        sortedPeople.sort((a, b) => {
          const locA = parseFloat(a.age);
          const locB = parseFloat(b.age);
          return iconData.complete ? locA - locB : locB - locA;
        });
        break;
      case 'description':
        sortedPeople.sort((a, b) => {
          return iconData.complete
            ? a.description.localeCompare(b.description)
            : b.description.localeCompare(a.description);
        });
        break;
      case 'startDate':
        sortedPeople.sort((a, b) => {
          return iconData.complete
            ? a.startDate.localeCompare(b.startDate)
            : b.startDate.localeCompare(a.startDate);
        });
        break;
      case 'status':
        sortedPeople.sort((a, b) => {
          return iconData.complete
            ? a.status.localeCompare(b.status)
            : b.status.localeCompare(a.status);
        });
        break;
      default:
        break;
    }
    setMarketData(sortedPeople);
  }

  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = AllTicketData.filter((ticket) =>
      Object.values(ticket).some((value) =>
        value.toString().toLowerCase().includes(query)
      )
    );

    setMarketData(filtered);
  };

  return (
    <Fragment>
      <PageTitle motherMenu={'Ticket'} activeMenu={'All Ticket'} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">All Ticket</h4>
              <Link to="/create-ticket" className="btn btn-primary">
                Add ticket
              </Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <div id="ticketList_1" className="dataTables_wrapper no-footer">
                  <div className="align-item-center d-sm-flex justify-content-between mb-2">
                    <div className="d-flex">
                      <Select
                        className="custom-react-select p2p-select width-100 mb-2"
                        options={count}
                        defaultValue={count[0]}
                        isSearchable={false}
                      />
                    </div>
                    <div className="align-item-center">
                      <label htmlFor="form">
                        Search:
                        <input
                          placeholder=""
                          type="text"
                          className=""
                          value={search}
                          onChange={handleSearch}
                        />
                      </label>
                    </div>
                  </div>
                  <table
                    id="example5"
                    className="table display mb-4 dataTablesCard fs-14 dataTable no-footer"
                  >
                    <thead>
                      <tr>
                        <th className="sorting_asc">
                          <div className="form-check custom-checkbox ms-2">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="checkAll"
                              required=""
                              onClick={() => chackboxFun('all')}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="checkAll"
                            ></label>
                          </div>
                        </th>
                        {theadData.map((item, ind) => (
                          <th
                            key={ind}
                            onClick={() => {
                              SotingData(item.sortingVale);
                              setIconDate((prevState) => ({
                                complete: !prevState.complete,
                                ind: ind,
                              }));
                            }}
                          >
                            {item.heading}
                            <span>
                              {ind !== iconData.ind && (
                                <i
                                  className="fa fa-sort ms-2 fs-12"
                                  style={{ opacity: '0.3' }}
                                />
                              )}
                              {ind === iconData.ind &&
                                (iconData.complete ? (
                                  <i
                                    className="fa fa-arrow-down ms-2 fs-12"
                                    style={{ opacity: '0.7' }}
                                  />
                                ) : (
                                  <i
                                    className="fa fa-arrow-up ms-2 fs-12"
                                    style={{ opacity: '0.7' }}
                                  />
                                ))}
                            </span>
                          </th>
                        ))}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketData.map((elem, ind) => (
                        <tr key={ind}>
                          <td className="sorting_1">
                            <div className="form-check custom-checkbox ms-2">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={elem.checkboxId}
                                required=""
                                onClick={() => chackboxFun()}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={elem.checkboxId}
                              ></label>
                            </div>
                          </td>
                          <td>{elem.role}</td>
                          <td>{elem.location}</td>
                          <td>{elem.age}</td>
                          <td>{elem.description}</td>
                          <td>{elem.startDate}</td>
                          <td>
                            <span className={`badge ${elem.badgeColor}`}>
                              {elem.status}
                            </span>
                          </td>
                          <td>
                            <Link
                              to={'#'}
                              className="btn btn-outline-primary btn-xs"
                            >
                              {elem.action}
                            </Link>
                          </td>
                          <td>{elem.timeElapsed}</td>
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
                          activePag.current > 0 &&
                          onClick(activePag.current - 1)
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
        </div>
      </div>
    </Fragment>
  );
}
