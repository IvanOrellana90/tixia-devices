import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IMAGES } from '../content/theme';

const ForgotPassword = () => {
  const Nav = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    Nav('/');
  };
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
                      alt="logo"
                    />
                  </Link>
                </div>
                <h4 className="text-center mb-4">Forgot Password</h4>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group mb-4">
                    <label className="form-label" for="email">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value="hello@example.com"
                      id="email"
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block">
                      SUBMIT
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

export default ForgotPassword;
