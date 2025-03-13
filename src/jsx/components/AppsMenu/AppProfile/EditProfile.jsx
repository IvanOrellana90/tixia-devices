import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import PageTitle from '../../../layouts/PageTitle';
import { IMAGES } from '../../../content/theme';

const options = [
  { value: '0', label: 'USA' },
  { value: '1', label: 'Russia' },
  { value: '2', label: 'Canada' },
  { value: '3', label: 'China' },
  { value: '4', label: 'India' },
];

const options2 = [
  { value: '1', label: 'className' },
  { value: '2', label: 'Tyumen' },
  { value: '3', label: 'Chelyabinsk' },
  { value: '4', label: 'Moscow' },
];

const options3 = [
  { value: '1', label: 'Select Gender' },
  { value: '2', label: 'Male' },
  { value: '3', label: 'Female' },
];

export default function EditProfile() {
  return (
    <Fragment>
      <PageTitle motherMenu={'App'} activeMenu={'Edit Profile'} />
      <div className="row">
        <div className="col-xl-3 col-lg-4">
          <div className="clearfix">
            <div className="card card-bx author-profile m-b30">
              <div className="card-body">
                <div className="p-5">
                  <div className="author-profile">
                    <div className="author-media">
                      <img src={IMAGES.ProfilePic} alt="profile" />
                      <div
                        className="upload-link"
                        title=""
                        data-bs-toggle="tooltip"
                        data-placement="right"
                        data-original-title="update"
                      >
                        <input type="file" className="update-flie" />
                        <i className="fa fa-camera" />
                      </div>
                    </div>
                    <div className="author-info">
                      <h6 className="title">John</h6>
                      <span>Developer</span>
                    </div>
                  </div>
                </div>
                <div className="info-list">
                  <ul>
                    <li>
                      <a href="app-profile.html">Models</a>
                      <span>36</span>
                    </li>
                    <li>
                      <a href="app-profile.html">Gallery</a>
                      <span>3</span>
                    </li>
                    <li>
                      <a href="app-profile.html">Lessons</a>
                      <span>1</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-footer">
                <div className="input-group mb-3">
                  <div className="form-control rounded text-center">
                    Portfolio
                  </div>
                </div>
                <div className="input-group">
                  <a
                    href="https://www.dexignzone.com/"
                    target="_blank"
                    className="form-control text-hover rounded "
                  >
                    www.dexignzone.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-8">
          <div className="card  card-bx m-b30">
            <div className="card-header">
              <h4 className="card-title">Account setup</h4>
            </div>
            <form className="profile-form">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6 m-b30">
                    <label className="form-label">
                      First name<span className="required ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" value="John" />
                  </div>
                  <div className="col-sm-6 m-b30">
                    <label className="form-label">
                      Last name<span className="required ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value="Marely"
                    />
                  </div>
                  <div className="col-sm-6 m-b30">
                    <label className="form-label">
                      Specialty<span className="required ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value="Developer"
                    />
                  </div>
                  <div className="col-sm-6 m-b30">
                    <label className="form-label">
                      Skills<span className="required ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value="React,  JavaScript,  HTML"
                    />
                  </div>
                  <div className="col-sm-6 m-b30">
                    <label className="form-label">
                      Gender<span className="required ms-1">*</span>
                    </label>
                    <Select
                      options={options3}
                      className="custom-react-select"
                      isSearchable={false}
                      defaultValue={options3[0]}
                    />
                  </div>
                  <div className="col-sm-6 m-b30">
                    <div className="example">
                      <label className="form-label">
                        Birth<span className="required ms-1">*</span>
                      </label>
                      <div className="input-hasicon mb-sm-0 mb-3">
                        <input
                          type="date"
                          name="datepicker"
                          className="form-control bt-datepicker"
                        />
                        <div className="icon">
                          <i className="far fa-calendar" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 m-b30">
                    <label className="form-label">
                      Phone<span className="required ms-1">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="+123456789"
                    />
                  </div>
                  <div className="col-sm-6 m-b30">
                    <label className="form-label">
                      Email adress<span className="required ms-1">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value="demo@gmail.com"
                    />
                  </div>
                  <div className="col-sm-6 m-b30">
                    <label className="form-label ">
                      Country<span className="required ms-1">*</span>
                    </label>
                    <Select
                      options={options}
                      className="custom-react-select"
                      isSearchable={false}
                      defaultValue={options[0]}
                    />
                  </div>
                  <div className="col-sm-6 m-b30">
                    <label className="form-label">
                      City<span className="required ms-1">*</span>
                    </label>
                    <Select
                      options={options2}
                      className="custom-react-select"
                      isSearchable={false}
                      defaultValue={options2[1]}
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary">UPDATE</button>
                <Link
                  to="/page-forgot-password"
                  className="text-primary btn-link"
                >
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
