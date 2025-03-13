import { Fragment } from 'react';
import PageTitle from '../../layouts/PageTitle';
import AccountDefaultCard from './Account/AccountDefaultCard';
import BasicForm from './Account/BasicForm';
import { Link } from 'react-router-dom';
import AccountConnected from './Account/AcccountConnected';

const notificationBlog = [
  { id: '1', inputid: 111, title: 'Notifications' },
  { id: '2', inputid: 112, title: 'Billing Updates' },
  { id: '3', inputid: 113, title: 'New Team Members' },
  { id: '4', inputid: 114, title: 'Completed Projects' },
  { id: '5', inputid: 115, title: 'Newsletters' },
];

function AccountSettings() {
  return (
    <Fragment>
      <PageTitle activeMenu={'Setting'} motherMenu={'Account'} />
      <div className="card profile-overview">
        <AccountDefaultCard activePage={'settings'} />
      </div>
      <div className="tab-content" id="tabContentMyProfileBottom">
        <div className="row">
          <div className="col-xl-8">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title">Basic Info</h6>
              </div>
              <div className="card-body">
                <BasicForm />
              </div>
              <div className="card-footer text-end">
                <Link to={'#'} className="btn btn-white">
                  Discard
                </Link>
                <Link to={'#'} className="btn btn-primary ms-2 mb-2">
                  Save Changes
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="row">
              <div className="col-12">
                <AccountConnected />
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="heading mb-0">Notifications</h4>
                  </div>
                  <div className="card-body py-3">
                    <form className="mt-2">
                      {notificationBlog.map((ele, ind) => (
                        <div
                          className="clearfix border-bottom border-light py-3"
                          key={ind}
                        >
                          <div className="row align-items-center">
                            <div className="col-sm-6">
                              <label className="form-label mb-md-0">
                                {ele.title}
                              </label>
                            </div>
                            <div className="col-sm-3 col-6">
                              <div className="form-check custom-checkbox me-4 mb-0 d-inline-block">
                                <input
                                  type="checkbox"
                                  className="form-check-input mb-0"
                                  id={`checkboxinp${ele.inputid}`}
                                  required=""
                                />
                                <label
                                  className="form-check-label mb-0"
                                  htmlFor={`checkboxinp${ele.inputid}`}
                                >
                                  Email
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-3 col-6">
                              <div className="form-check custom-checkbox me-4 mb-0 d-inline-block">
                                <input
                                  type="checkbox"
                                  className="form-check-input mb-0"
                                  id={`checkboxsecond${ele.inputid}`}
                                  required=""
                                />
                                <label
                                  className="form-check-label mb-0"
                                  htmlFor={`checkboxinp${ele.inputid}`}
                                >
                                  Phone
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </form>
                  </div>
                  <div className="card-footer text-end">
                    <Link to={'#'} className="btn btn-white">
                      Discard
                    </Link>
                    <Link to={'#'} className="btn btn-primary ms-2 mb-2">
                      Save Changes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="heading mb-0">Deactivate Account</h4>
              </div>
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
                      />
                    </svg>
                  </div>
                  <div className="mx-3">
                    <h6 className="mb-0 fw-semibold">
                      You are deactivatiing your account
                    </h6>
                    <p className="mb-0">
                      For extra security, this requires you to confirm your
                      email or phone number when you reset your password.
                      <Link to={'#'} className="text-warning">
                        Learn More
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="form-check custom-checkbox me-4 my-3 d-inline-block">
                  <input
                    type="checkbox"
                    className="form-check-input mb-0"
                    id="checkboxDeactivation"
                    required=""
                  />
                  <label
                    className="form-check-label mb-0"
                    htmlFor="checkboxDeactivation"
                  >
                    Confirm Account Deactivation
                  </label>
                </div>
              </div>
              <div className="card-footer text-end">
                <Link to={'#'} className="btn btn-danger ms-2">
                  Deactivate Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default AccountSettings;
