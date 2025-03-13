import { Fragment, useEffect, useRef, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const licensesData = [
  {
    status: 'License',
    statusClass: 'success',
    workstation: 'DSI: Workstation 2',
    ip: '236.125.56.78',
    timeAgo: '2 mins ago',
    key: 'fftt456765gjkkjhi83093985',
  },
  {
    status: 'Unknown',
    statusClass: 'danger',
    workstation: 'ReXe: Workstation 29',
    ip: '236.125.56.78',
    timeAgo: '2 mins ago',
    key: 'none',
  },
  {
    status: 'License',
    statusClass: 'success',
    workstation: 'RamenLC: Workstation 2',
    ip: '236.125.56.78',
    timeAgo: '2 mins ago',
    key: 'none',
  },
  {
    status: 'License',
    statusClass: 'success',
    workstation: 'Nest Five: Workstation 86',
    ip: '236.125.56.78',
    timeAgo: '2 mins ago',
    key: 'fftt456765gjkkjhi83093985',
  },
  {
    status: 'Unknown',
    statusClass: 'danger',
    workstation: 'DSI: Workstation 3',
    ip: '236.125.56.78',
    timeAgo: '2 mins ago',
    key: 'none',
  },
  {
    status: 'License',
    statusClass: 'success',
    workstation: 'ReXe: Workstation 7',
    ip: '236.125.56.78',
    timeAgo: '2 mins ago',
    key: 'fftt456765gjkkjhi83093985',
  },
  {
    status: 'To be Paid',
    statusClass: 'warning',
    workstation: 'Swedline: Workstation 54',
    ip: '236.125.56.78',
    timeAgo: '2 mins ago',
    key: 'fftt456765gjkkjhi83093985',
  },
  {
    status: 'License',
    statusClass: 'success',
    workstation: 'Swedline: Workstation 21',
    ip: '236.125.56.78',
    timeAgo: '2 mins ago',
    key: 'fftt456765gjkkjhi83093985',
  },
  {
    status: 'License',
    statusClass: 'success',
    workstation: 'DSI: Workstation 320',
    ip: '236.125.56.78',
    timeAgo: '2 mins ago',
    key: 'fftt456765gjkkjhi83093985',
  },
  {
    status: 'Unknown',
    statusClass: 'danger',
    workstation: 'Konami: Workstation 4',
    ip: '236.125.56.78',
    timeAgo: '2 mins ago',
    key: 'none',
  },
  {
    status: 'License',
    statusClass: 'success',
    workstation: 'Samsung LDE : Workstation 45',
    ip: '236.125.56.78',
    timeAgo: '2 mins ago',
    key: 'fftt456765gjkkjhi83093985',
  },
];

function LicenseTable() {
  const [data, setData] = useState(
    document.querySelectorAll('#license_table tbody tr')
  );
  const sort = 9;
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
    setData(document.querySelectorAll('#license_table tbody tr'));
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
  const [selectValue, setSelectValue] = useState('All Time');
  return (
    <Fragment>
      <div className="card">
        <div className="card-header border-0 py-3 pb-0">
          <h4 className="heading mb-0">License Usage</h4>
          <div className="clearfix d-flex align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                as="button"
                className="btn btn-primary tp-btn-light  d-flex align-items-center i-false"
              >
                {selectValue}
                <i className="fas fa-angle-down text-primary ms-1" />
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="dropdown-menu dropdown-menu-end mt-1"
                align="end"
              >
                <Dropdown.Item
                  className=" text-primary"
                  onClick={() => setSelectValue('All Time')}
                >
                  All Time
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectValue('Week')}>
                  Week
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectValue('Month')}>
                  Month
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div id="licenseUsageExcelBTN"></div>
          </div>
        </div>
        <div className="card-body p-3">
          <div className="table-responsive">
            <div
              className="table-responsive dataTables_wrapper"
              id="license_table"
            >
              <table
                className="table mb-1 table-striped-thead table-wide table-sm"
                id="tableLicenseUsage"
              >
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Operator</th>
                    <th>IP Address</th>
                    <th>Created</th>
                    <th>API Keys</th>
                  </tr>
                </thead>
                <tbody>
                  {licensesData.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <span
                          className={`badge badge-sm light border-0 badge-${item.statusClass}`}
                        >
                          License
                        </span>
                      </td>
                      <td>{item.workstation}</td>
                      <td>{item.ip}</td>
                      <td>{item.timeAgo}</td>
                      <td>
                        <div className="select-text-wrap d-flex justify-content-between">
                          <div className="text-select-copy">{item.key}</div>
                          <button className="btn-select-text btn p-0 border-0 ms-4">
                            <i className="las la-copy fs-4" />
                            <span>Copy</span>
                          </button>
                        </div>
                      </td>
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
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default LicenseTable;
