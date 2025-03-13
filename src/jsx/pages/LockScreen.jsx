import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IMAGES } from '../content/theme';

const LockScreen = () => {
  const Nav = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    Nav('/');
  };
  const [openEye, setOpenEye] = useState(true);
  return (
    <div className="fix-wrapper">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-5 col-md-6">
            <div className="card mb-0 h-auto">
              <div className="card-body">
                <div className="text-center mb-3">
                  <Link to="/">
                    <img className="logo-auth" src={IMAGES.logofull} alt="" />
                  </Link>
                </div>
                <h4 className="text-center mb-4">Account Locked</h4>
                <form onSubmit={submitHandler}>
                  <div className="form-group mb-3">
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
                      Unlock
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
