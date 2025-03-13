import { Fragment, useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import AccountDefaultCard from './Account/AccountDefaultCard';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import LogsTable from './Account/LogsTable';

const logsTable = [
  {
    status: 'OK',
    statusClass: 'success',
    action: 'POST/project/Jobick/5482344/not_found',
    dateTime: '20 Dec 2024, 2:40 pm',
  },
  {
    status: 'ERROR',
    statusClass: 'danger',
    action: 'POST/project/Jobick/5482344/invalid',
    dateTime: '25 Jul 2024, 5:30 pm',
  },
  {
    status: 'ERROR',
    statusClass: 'danger',
    action: 'POST/project/Jobick/5482344/payment',
    dateTime: '20 Dec 2024, 2:40 pm',
  },
  {
    status: 'OK',
    statusClass: 'success',
    action: 'POST/project/Jobick/5482344/not_found',
    dateTime: '21 Feb 2024, 2:40 pm',
  },
  {
    status: 'OK',
    statusClass: 'success',
    action: 'POST/project/Jobick/5482344/not_found',
    dateTime: '25 Jul 2024, 5:30 pm',
  },
  {
    status: 'ERROR',
    statusClass: 'danger',
    action: 'POST/project/Jobick/5482344/not_found',
    dateTime: '20 Dec 2024, 2:40 pm',
  },
  {
    status: 'OK',
    statusClass: 'success',
    action: 'POST/project/Jobick/5482344/payment',
    dateTime: '20 Dec 2024, 2:40 pm',
  },
];

function AccountLogs() {
  const [selectValue, setSelectValue] = useState('All Time');
  return (
    <Fragment>
      <PageTitle activeMenu={'logs & Notifications'} motherMenu={'Account'} />
      <div className="card profile-overview">
        <AccountDefaultCard activePage={'logs'} />
      </div>
      <div className="tab-content" id="tabContentMyProfileBottom">
        <div className="row">
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header border-0 py-3 pb-0">
                <h4 className="heading mb-0">Logs</h4>
                <div className="d-flex align-items-center">
                  <Dropdown>
                    <Dropdown.Toggle
                      as="button"
                      className="btn btn-primary tp-btn-light  d-flex align-items-center i-false"
                    >
                      {selectValue}
                      {/* <i className="fas fa-angle-down text-primary ms-1" /> */}
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
                  <button className="btn btn-sm btn-primary ms-2">
                    View All
                  </button>
                </div>
              </div>
              <div className="card-body p-4">
                <div className="table-responsive">
                  <table className="table mb-1 table-striped-thead table-wide table-sm table-border-last-0">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>URL</th>
                        <th className="text-end">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logsTable.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <span
                              className={`badge badge-sm light border-0 badge-${item.statusClass}`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <Link to={'#'} className="text-primary">
                              {item.action}
                            </Link>
                          </td>
                          <td className="text-end">{item.dateTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header border-0 py-3 pb-0">
                <h4 className="heading mb-0">Login Sessions</h4>
                <div id="tableLogsExcelBTN"></div>
              </div>
              <div className="card-body p-3 pb-0">
                <div className="table-responsive">
                  <LogsTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default AccountLogs;
