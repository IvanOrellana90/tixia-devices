import { Fragment } from 'react';
import PageTitle from '../../layouts/PageTitle';
import ProfileOverviewCard from './ProfileOverviewCard';
import { IMAGES } from '../../content/theme';
import { Link } from 'react-router-dom';

const projectCardList = [
  {
    id: '1',
    logo: IMAGES.Figma,
    title: 'Figma Design',
    progress: '60%',
    status: 'In Progress',
    statuscolor: 'primary',
  },
  {
    id: '2',
    logo: IMAGES.Slack,
    title: 'Github Repository',
    progress: '69%',
    status: 'Pending',
    statuscolor: 'danger',
  },
  {
    id: '3',
    logo: IMAGES.Html,
    title: 'Music App',
    progress: '75%',
    status: 'Complete',
    statuscolor: 'success',
  },
  {
    id: '4',
    logo: IMAGES.Github,
    title: 'Banking System',
    progress: '92%',
    status: 'Testing',
    statuscolor: 'warning',
  },
  {
    id: '5',
    logo: IMAGES.Spotify,
    title: 'Cloud Store',
    progress: '68%',
    status: 'Pending',
    statuscolor: 'danger',
  },
  {
    id: '6',
    logo: IMAGES.Twitch,
    title: 'React Design',
    progress: '68%',
    status: 'Complete',
    statuscolor: 'success',
  },
  {
    id: '7',
    logo: IMAGES.Dropbox,
    title: 'eCommerce Theme',
    progress: '86%',
    status: 'Testing',
    statuscolor: 'warning',
  },
  {
    id: '8',
    logo: IMAGES.Amazon,
    title: 'Music App',
    progress: '65%',
    status: 'Complete',
    statuscolor: 'success',
  },
];

function Projects() {
  return (
    <Fragment>
      <PageTitle activeMenu={'Pojects'} motherMenu={'Profile'} />
      <div className="card profile-overview profile-overview-wide">
        <ProfileOverviewCard activePage="projects" />
      </div>
      <div className="tab-content" id="tabContentMyProfileBottom">
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">My Projects</h5>
              <div className="d-flex align-items-center">
                <Link to={'#'} className="btn btn-primary btn-sm ms-2">
                  + New Project
                </Link>
              </div>
            </div>
          </div>
          {projectCardList.map((elem, ind) => (
            <div className="col-xl-3 col-xxl-4 col-sm-6" key={ind}>
              <div href="profile/projects-details.html" className="card">
                <div className="card-body">
                  <div className="clearfix d-flex">
                    <div className="avatar avatar-md rounded bg-light d-flex align-items-center justify-content-center me-3">
                      <img src={elem.logo} className="m-0" alt="logo" />
                    </div>
                    <div className="clearfix">
                      <h6 className="mb-0 fw-semibold">{elem.title}</h6>
                      <span className="text-muted fs-13">
                        There are many variations
                      </span>
                    </div>
                  </div>
                  <p className="my-3">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <div className="clearfix">
                    <p className="mb-1 font-w500">Team</p>
                    <div className="avatar-list avatar-list-stacked">
                      <img
                        src={IMAGES.Avatar8}
                        className="avatar rounded-circle"
                        alt="avat"
                      />{' '}
                      <img
                        src={IMAGES.Avatar6}
                        className="avatar rounded-circle"
                        alt="avat"
                      />{' '}
                      <img
                        src={IMAGES.Avatar4}
                        className="avatar rounded-circle"
                        alt="avat"
                      />{' '}
                      <img
                        src={IMAGES.Avatar2}
                        className="avatar rounded-circle"
                        alt="avat"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium">Project Complete</span>
                      <span className="">{elem.progress}</span>
                    </div>
                    <div className="progress mt-2">
                      {elem.id / 2 === 1 ? (
                        <div
                          className="progress-bar bg-purple"
                          style={{ width: elem.progress, borderRadius: '4px' }}
                        ></div>
                      ) : (
                        <div
                          className="progress-bar bg-danger"
                          style={{ width: elem.progress, borderRadius: '4px' }}
                        ></div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between flex-wrap">
                  <div className="due-progress mb-0">
                    <p className="mb-0 ">
                      Due <span className="text-purple">: 2024-10-02</span>
                    </p>
                  </div>
                  <span
                    className={`badge badge-sm light border-0 badge-${elem.statuscolor}`}
                  >
                    {elem.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
export default Projects;
