import { Fragment, useState } from 'react';
import Select from 'react-select';

import PageTitle from '../../layouts/PageTitle';

const options = [
  { label: 'Please select', value: '0' },
  { label: 'Male', value: '1' },
  { label: 'Female', value: '2' },
];

export default function AddCustomers() {
  const [openPassword, setOpenPassword] = useState(true);
  return (
    <Fragment>
      <PageTitle motherMenu={' Customers'} activeMenu={'Add Customers'} />
      <div className="row">
        <div className="col-xl-12">
          <div className="card  card-bx m-b30">
            <div className="card-header bg-primary">
              <h6 className="title text-white">Create Customer</h6>
            </div>
            <form className="profile-form">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6 mb-3">
                    <label className="form-label required">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Enter First Name"
                      required=""
                    />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className=" form-label required">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter Last Name"
                      required=""
                    />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className=" form-label required">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email Address"
                      required
                    />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <div className="form-group">
                      <label className=" form-label required">Password </label>
                      <div className="position-relative">
                        <input
                          type={openPassword ? 'password' : 'text'}
                          id="dz-password"
                          className="form-control"
                          defaultValue="123456"
                        />
                        <span
                          className={`show-pass eye ${openPassword ? '' : 'active'}`}
                          onClick={() => setOpenPassword(!openPassword)}
                        >
                          <i className="fa fa-eye-slash" />
                          <i className="fa fa-eye" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className=" form-label required">Gender</label>
                    <Select
                      className="custom-react-select"
                      options={options}
                      isSearchable={false}
                      defaultValue={options[0]}
                    />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className=" form-label required">
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="212-999-0000"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer justify-content-end">
                <button className="btn btn-primary">Create Customer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
