import { Fragment } from 'react';
import PageTitle from '../../layouts/PageTitle';
import AccountDefaultCard from './Account/AccountDefaultCard';
import SliderBlog from './Account/SliderBlog';
import SliderBlog2 from './Account/SliderBlog2';
import { IMAGES } from '../../content/theme';
import { Link } from 'react-router-dom';
import LicenseTable from './Account/LicenseTable';
import AccountActivityChart from './Account/AccountActivityChart';

function AccountSecurity() {
  return (
    <Fragment>
      <PageTitle activeMenu={'Security'} motherMenu={'Account'} />
      <div className="card profile-overview">
        <AccountDefaultCard activePage={'security'} />
      </div>
      <div className="tab-content" id="tabContentMyProfileBottom">
        <div className="row">
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h4 className="heading mb-0">Security Summary</h4>
              </div>
              <AccountActivityChart />
            </div>
          </div>
          <div className="col-xl-3 col-lg-6">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body p-4">
                    <SliderBlog />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <SliderBlog2 />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6">
            <div className="card">
              <div className="card-body text-center p-3 pb-1">
                <div className="clearfix">
                  <h4>
                    Upgrade to Pro <br /> Create Limitless Deals
                  </h4>
                  <p>
                    Craft a headline that is both informative and will capture
                    creating an outline, and checking facts
                  </p>
                  <Link to={'#'} className="btn btn-primary">
                    Upgrade Now
                  </Link>
                </div>
              </div>
              <div className="card-footer border-0 p-0">
                <div className="px-xl-0 px-md-5">
                  <img
                    className="view-light w-100"
                    src={IMAGES.Upgrade}
                    alt="light"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <LicenseTable />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default AccountSecurity;
