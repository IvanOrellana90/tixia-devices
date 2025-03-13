import { Fragment } from 'react';
import PageTitle from '../../layouts/PageTitle';
import ProfileOverviewCard from './ProfileOverviewCard';
import { IMAGES, SVGICON } from '../../content/theme';
import { Link } from 'react-router-dom';

const adsCradBlog = [
  {
    logo: IMAGES.LargeTwitch,
    title: 'Twitch Ads',
    digit: '$450.00',
    percent: '+32.40%',
    status: 'success',
    subtitle: 'more spending',
  },
  {
    logo: IMAGES.Twitter,
    title: 'Twiitter',
    digit: '750K',
    percent: '+8.80%',
    status: 'success',
    subtitle: 'folowers growth',
  },
  {
    logo: IMAGES.LargeSpotify,
    title: 'Spotify Listerners',
    digit: '1,125',
    percent: '-10%',
    status: 'danger',
    subtitle: 'less comments than usual',
  },
  {
    logo: IMAGES.Telegram,
    title: 'Telegram Posts',
    digit: '580',
    percent: '+25%',
    status: 'success',
    subtitle: 'more spending',
  },
  {
    logo: IMAGES.Pinterest,
    title: 'Pintrest Posts',
    digit: '120',
    percent: '+58.32%',
    status: 'success',
    subtitle: 'more posts',
  },
  {
    logo: IMAGES.LargeGithub,
    title: 'Github Contributes',
    digit: '2,250',
    percent: '-12.50%',
    status: 'danger',
    subtitle: 'less contributes than usual',
  },
  {
    logo: IMAGES.Youtube,
    title: 'Youtube Subscribers',
    digit: '350',
    percent: '+5.50%',
    status: 'success',
    subtitle: 'subscribewrs growth',
  },
  {
    logo: IMAGES.Reddit,
    title: 'Reddit Awards',
    digit: '1.5M',
    percent: '+5.52%',
    status: 'success',
    subtitle: 'folowers growth',
  },
];

function Campaigns() {
  return (
    <Fragment>
      <PageTitle motherMenu={'Profile'} activeMenu={'Campaigns'} />
      <div className="card profile-overview profile-overview-wide">
        <ProfileOverviewCard activePage="campaigns" />
      </div>
      <div className="tab-content" id="tabContentMyProfileBottom">
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">My Campaigns</h5>
              <div className="d-flex align-items-center">
                <Link to={'#'} className="btn btn-primary btn-sm ms-2">
                  + Add Campaign
                </Link>
              </div>
            </div>
          </div>
          {adsCradBlog.map((elem, ind) => (
            <div className="col-xl-3 col-sm-6" key={ind}>
              <div className="card overflow-hidden">
                <div className="card-body p-4">
                  <div className="p-2">
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-md d-flex align-items-center justify-content-center">
                          <img src={elem.logo} width="35" alt="" />
                        </div>
                        <span className="ms-3">{elem.title}</span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-light btn-icon-xxs tp-btn fs-18 align-self-start"
                      >
                        <i className="bi bi-grid" />
                      </button>
                    </div>
                    <h2 className="fw-semibold pt-1">{elem.digit}</h2>
                    <p className="mb-0">
                      {elem.status === 'success'
                        ? SVGICON.ArrowUpGreen
                        : SVGICON.ArrowDownRed}
                      <span className={`me-2 text-${elem.status}`}>
                        {elem.percent}
                      </span>
                      {elem.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
export default Campaigns;
