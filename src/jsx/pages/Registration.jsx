import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../content/theme';

const Register = () => {
  const [registrationData, setRegistrationData] = useState({});
  const handleBlur = (e) => {
    const newRegistrationData = { ...registrationData };
    newRegistrationData[e.target.name] = e.target.value;
    setRegistrationData(newRegistrationData);
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const [openEye, setOpenEye] = useState(true);
  return (
    <div className="fix-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6">
            <div className="card mb-0 h-auto">
              <div className="card-body">
                <div className="text-center mb-3">
                  <Link to={'/'}>
                    <img
                      className="logo-auth"
                      src={IMAGES.logofull}
                      alt="log"
                    />
                  </Link>
                </div>
                <h4 className="text-center mb-4">Sign up your account</h4>
                <form onSubmit={(e) => submitHandler(e)}>
                  <div className="form-group mb-4">
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter username"
                      id="username"
                      onChange={handleBlur}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="hello@example.com"
                      id="email"
                      onChange={handleBlur}
                    />
                  </div>
                  <div className="form-group mb-sm-4 mb-3">
                    <label className="form-label">Password</label>
                    <div className="position-relative">
                      <input
                        type={openEye ? 'password' : ''}
                        id="dz-password"
                        className="form-control"
                        value="123456"
                      />
                      <span
                        className={`show-pass eye ${openEye ? '' : 'active'}`}
                        onClick={() => setOpenEye(!openEye)}
                      >
                        <i className="fa fa-eye-slash" />
                        <i className="fa fa-eye" />
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign up
                    </button>
                  </div>
                </form>
                <div className="new-account mt-3">
                  <p>
                    Already have an account?{' '}
                    <Link className="text-primary" to="/page-login">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
