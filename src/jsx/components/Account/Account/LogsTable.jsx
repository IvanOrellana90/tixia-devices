import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const CountryTable = [
  {
    country: 'China',
    status: 'OK',
    statusClass: 'success',
    platform: 'Chrome - Windows',
    ip: '236.125.56.78',
    timeAgo: '2 mins ago',
  },
  {
    country: 'India',
    status: 'ERROR',
    statusClass: 'danger',
    platform: 'Firefox - Windows',
    ip: '236.125.56.54',
    timeAgo: '20 mins ago',
  },
  {
    country: 'United States',
    status: 'ERROR',
    statusClass: 'danger',
    platform: 'Safari - Mac',
    ip: '236.125.56.78',
    timeAgo: '27 mins ago',
  },
  {
    country: 'Indonesia',
    status: 'OK',
    statusClass: 'success',
    platform: 'iOS - iPhone Pro',
    ip: '236.100.56.50',
    timeAgo: '40 mins ago',
  },
  {
    country: 'Pakistan',
    status: 'OK',
    statusClass: 'success',
    platform: 'Firefox - Windows',
    ip: '236.125.56.54',
    timeAgo: '48 mins ago',
  },
  {
    country: 'Brazil',
    status: 'ERROR',
    statusClass: 'danger',
    platform: 'Safari - Mac',
    ip: '236.125.56.78',
    timeAgo: '54 mins ago',
  },
  {
    country: 'China',
    status: 'OK',
    statusClass: 'success',
    platform: 'Chrome - Windows',
    ip: '236.125.56.78',
    timeAgo: '2 mins ago',
  },
  {
    country: 'India',
    status: 'ERROR',
    statusClass: 'danger',
    platform: 'Firefox - Windows',
    ip: '236.125.56.54',
    timeAgo: '20 mins ago',
  },
  {
    country: 'United States',
    status: 'ERROR',
    statusClass: 'danger',
    platform: 'Safari - Mac',
    ip: '236.125.56.78',
    timeAgo: '27 mins ago',
  },
  {
    country: 'Indonesia',
    status: 'OK',
    statusClass: 'success',
    platform: 'iOS - iPhone Pro',
    ip: '236.100.56.50',
    timeAgo: '40 mins ago',
  },
  {
    country: 'Pakistan',
    status: 'OK',
    statusClass: 'success',
    platform: 'Firefox - Windows',
    ip: '236.125.56.54',
    timeAgo: '48 mins ago',
  },
];

function LogsTable() {
  const [data, setData] = useState(
    document.querySelectorAll('#applications-data tbody tr')
  );
  const sort = 7;
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
  useEffect(() => {
    setData(document.querySelectorAll('#applications-data tbody tr'));
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

  return (
    <Fragment>
      <div
        className="table-responsive dataTables_wrapper"
        id="applications-data"
      >
        <table
          id="tableLogs"
          className="table mb-1 table-striped-thead table-wide table-sm"
        >
          <thead>
            <tr>
              <th>Location</th>
              <th>Status</th>
              <th>Device</th>
              <th>IP Address</th>
              <th className="text-end">Time</th>
            </tr>
          </thead>
          <tbody>
            {CountryTable.map((item, ind) => (
              <tr key={ind}>
                <td>{item.country}</td>
                <td>
                  <span
                    className={`badge badge-sm light border-0 badge-${item.statusClass}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <Link to={'#'} className="text-primary">
                    {item.platform}
                  </Link>
                </td>
                <td>{item.ip}</td>
                <td className="text-end">{item.timeAgo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-sm-flex text-center justify-content-between align-items-center mb-1">
          <div className="dataTables_info pt-0" id="example5_info">
            Showing {activePag.current * sort + 1} to{' '}
            {data.length > (activePag.current + 1) * sort
              ? (activePag.current + 1) * sort
              : data.length}{' '}
            of {data.length} entries
          </div>

          <div
            className="dataTables_paginate paging_simple_numbers mb-0"
            id="example5_paginate"
          >
            <Link
              to="#"
              className="paginate_button previous disabled"
              onClick={() =>
                activePag.current > 0 && onClick(activePag.current - 1)
              }
            >
              <i className="fa-solid fa-angle-left" />
            </Link>
            <span>
              {paggination.map((number, i) => (
                <Link
                  key={i}
                  to="#"
                  className={`paginate_button  ${activePag.current === i ? 'current' : ''} `}
                  onClick={() => onClick(i)}
                >
                  {number}
                </Link>
              ))}
            </span>
            <Link
              to="#"
              className="paginate_button next"
              onClick={() =>
                activePag.current + 1 < paggination.length &&
                onClick(activePag.current + 1)
              }
            >
              <i className="fa-solid fa-angle-right" />
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default LogsTable;
