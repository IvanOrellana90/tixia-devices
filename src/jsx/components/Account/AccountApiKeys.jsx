import { Fragment } from 'react';
import PageTitle from '../../layouts/PageTitle';
import AccountDefaultCard from './Account/AccountDefaultCard';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TableDataEntries = [
  {
    name: 'none set',
    code: 'hhhhhh5782516nsdzjvn54',
    date: 'Nov 01, 2024',
    status: 'Active',
    statusClass: 'success',
  },
  {
    name: 'Navitare',
    code: 'hhhhhh5782516nsdzjvn54',
    date: 'Sep 27, 2024',
    status: 'Review',
    statusClass: 'info',
  },
  {
    name: 'Docs API Key',
    code: 'hhhhhh5782516nsdzjvn54',
    date: 'Jul 09, 2024',
    status: 'Inactive',
    statusClass: 'danger',
  },
  {
    name: 'Identity Key',
    code: 'jk076590ygghgh324vd3568',
    date: 'May 14, 2024',
    status: 'Active',
    statusClass: 'success',
  },
  {
    name: 'Remore Interface',
    code: 'nzsdvnn584948941',
    date: 'Dec 30, 2024',
    status: 'Active',
    statusClass: 'success',
  },
  {
    name: 'none set',
    code: 'nzsdvnn584948941',
    date: 'Oct 25, 2024',
    status: 'Inactive',
    statusClass: 'danger',
  },
  {
    name: 'Test App',
    code: 'nzsdvnn584948941',
    date: 'Apr 03, 2024',
    status: 'Active',
    statusClass: 'success',
  },
];
function AccountApiKeys() {
  return (
    <Fragment>
      <PageTitle activeMenu={'Billing'} motherMenu={'Account'} />
      <div className="card profile-overview">
        <AccountDefaultCard activePage={'apikeys'} />
      </div>
      <div className="tab-content" id="tabContentMyProfileBottom">
        <div className="row">
          <div className="col-xl-8">
            <div className="card">
              <div className="card-header border-0 py-3 pb-0">
                <h4 className="heading mb-0">API Keys</h4>
                <button className="btn btn-sm btn-primary">Create A Key</button>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table mb-1 table-striped-thead table-wide table-md table-border-last-0">
                    <thead>
                      <tr>
                        <th>Label</th>
                        <th>API Keys</th>
                        <th>Created</th>
                        <th>Status</th>
                        <th className="text-end">Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TableDataEntries.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>
                            <div className="select-text-wrap d-flex justify-content-between">
                              <div className="text-select-copy">
                                {item.code}
                              </div>
                              <button className="btn-select-text btn p-0 border-0 ms-4">
                                <i className="las la-copy fs-4"></i>
                                <span>Copy</span>
                              </button>
                            </div>
                          </td>
                          <td>{item.date}</td>
                          <td>
                            <span
                              className={`badge badge-sm light border-0 badge-${item.statusClass}`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="text-end">
                            <Dropdown>
                              <Dropdown.Toggle
                                as="div"
                                className="btn btn-sm btn-light"
                              >
                                Options
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="mw-w100 dropdown-menu-end">
                                <li>
                                  <Link to={'#'} className="dropdown-item">
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link to={'#'} className="dropdown-item">
                                    Delete
                                  </Link>
                                </li>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card">
              <div className="card-header">
                <h4 className="heading mb-0">API Overview</h4>
              </div>
              <div className="card-body p-0">
                <div className="clearfix border-bottom p-4 border-dark border-opacity-10">
                  <h6>How to set API</h6>
                  <p className="fs-14">
                    Elevate your post: Integrate images for impact, smooth flow,
                    humor, and clarity on complex subjects
                  </p>
                  <Link to={'#'} className="btn btn-light">
                    Get Started
                  </Link>
                </div>
                <div className="clearfix p-4">
                  <h6>Developer Tools</h6>
                  <p className="fs-14">
                    Craft your blog post: Choose a topic, outline, research, and
                    fact-check diligently.
                  </p>
                  <Link to={'#'} className="btn btn-light">
                    Create CLI Rule
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
export default AccountApiKeys;
