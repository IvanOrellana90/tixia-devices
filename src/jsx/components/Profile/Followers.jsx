import { Fragment } from 'react';

import ProfileOverviewCard from './ProfileOverviewCard';
import PageTitle from '../../layouts/PageTitle';
import { IMAGES } from '../../content/theme';
import { Link } from 'react-router-dom';

const artCardData = [
  { name: 'Lawrence', image: IMAGES.Avat5 },
  { name: 'Sean Bean', image: IMAGES.Avat6, text: true, textbg: 'info' },
  { name: 'Alan Johnson', image: IMAGES.Avat5 },
  { name: 'Peter Marcus', image: IMAGES.Avat6, text: true, textbg: 'purple' },
  { name: 'Harvey', image: IMAGES.Avat5 },
  { name: 'Johnson', image: IMAGES.Avat6 },
  { name: 'Marshall', image: IMAGES.Avat5, text: true, textbg: 'warning' },
  { name: 'McDonald', image: IMAGES.Avat6, text: true, textbg: 'success' },
];

function Followers() {
  return (
    <Fragment>
      <PageTitle motherMenu={'Profile'} activeMenu={'Documents'} />
      <div className="card profile-overview profile-overview-wide">
        <ProfileOverviewCard activePage="followers" />
      </div>
      <div className="tab-content" id="tabContentMyProfileBottom">
        <div className="row">
          {artCardData.map((item, ind) => (
            <div className="col-xl-3 col-xxl-4 col-sm-6" key={ind}>
              <div className="card">
                <div className="card-body text-center p-4">
                  <div className="mx-auto d-inline-block position-relative mb-3">
                    {item.text && item.text ? (
                      <div
                        className={` avatar avatar-lg  text-info rounded-circle mx-auto d-flex align-items-center justify-content-center bg-${item.textbg}-light`}
                      >
                        S
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        alt="avat"
                        className="rounded-circle avatar avatar-lg"
                      />
                    )}
                    <span className="fa fa-circle bored border-light text-success position-absolute bottom-0 end-0 mb-0 me-1 fs-12"></span>
                  </div>
                  <div className="media-body mb-4">
                    <h4 className="mb-0">
                      <Link to="#" className="text-black">
                        {item.name}
                      </Link>
                    </h4>
                    <p className="mb-0 fs-15">Art Director at DexignLab.</p>
                  </div>
                  <div className="d-flex justify-content-center px-3">
                    <div className="bg-light rounded px-3 py-2 text-start mx-2 flex-grow-1">
                      <h6 className="fs-14 mb-0">$12,500.00</h6>
                      <span className="fs-13">Avg. Deal</span>
                    </div>
                    <div className="bg-light rounded px-3 py-2 text-start mx-2 flex-grow-1">
                      <h6 className="fs-14 mb-0">$150,500.00</h6>
                      <span className="fs-13">Deals</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-info btn-follow me-1 mt-4"
                  >
                    <i className="la la-user me-1 fs-14" />
                    Follow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
export default Followers;
