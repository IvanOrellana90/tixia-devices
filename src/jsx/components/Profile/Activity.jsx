import { Fragment } from 'react';
import PageTitle from '../../layouts/PageTitle';
import ProfileOverviewCard from './ProfileOverviewCard';
import { Nav, Tab } from 'react-bootstrap';
import DraggableBlog from './Profile/DragabbleBlog';
import TabActivityData from './Profile/TabActivityData';
import ActivityBlog from './Profile/ActivityBlog';
import { Link } from 'react-router-dom';

function Activity() {
  return (
    <Fragment>
      <PageTitle activeMenu={'Activity'} motherMenu={'Profile'} />
      <div className="card profile-overview profile-overview-wide">
        <ProfileOverviewCard activePage="activity" />
      </div>
      <div className="tab-content" id="tabContentMyProfileBottom">
        <div className="row">
          <div className="col-xxl-12 col-xl-8">
            <div className="card">
              <Tab.Container defaultActiveKey={'Week'}>
                <div className="card-header py-3 d-block d-sm-flex">
                  <h4 className="heading mb-0">Oct 24, 2024</h4>
                  <Nav
                    as="ul"
                    className="nav nav-pills mt-3 mt-sm-0"
                    id="myTab"
                  >
                    <Nav.Item as="li" className="nav-item ms-1">
                      <Nav.Link
                        as="button"
                        className="nav-link btn btn-light"
                        eventKey={'Week'}
                      >
                        Week
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-item ms-1">
                      <Nav.Link
                        as="button"
                        className="nav-link btn btn-light"
                        eventKey={'Month'}
                      >
                        Month
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-item ms-1">
                      <Nav.Link
                        as="button"
                        className="nav-link btn btn-light"
                        eventKey={'Year'}
                      >
                        Year
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-item ms-1">
                      <Nav.Link
                        as="button"
                        className="nav-link btn btn-light"
                        eventKey={'All'}
                      >
                        All
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
                <div className="card-body">
                  <Tab.Content>
                    <Tab.Pane eventKey="Week">
                      <TabActivityData />
                    </Tab.Pane>
                    <Tab.Pane eventKey="Month">
                      <TabActivityData />
                    </Tab.Pane>
                    <Tab.Pane eventKey="Year">
                      <TabActivityData />
                    </Tab.Pane>
                    <Tab.Pane eventKey="All">
                      <TabActivityData />
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Tab.Container>
            </div>
          </div>
          <div className="col-xxl-12 col-xl-4">
            <div className="row sticky-top sticky-top-80 z-0">
              <div className="col-md-12 col-xxl-6">
                <div className="card overflow-hidden">
                  <div className="card-header">
                    <h4 className="heading mb-0">My To Do Items</h4>
                    <div>
                      <Link to={'#'} className="text-primary me-2">
                        View All
                      </Link>
                      <Link to={'#'} className="text-black">
                        {' '}
                        + Add To Do
                      </Link>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="dt-do-bx">
                      <div className="draggable-zone dropzoneContainer to-dodroup dz-scroll">
                        <DraggableBlog />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-xxl-6">
                <ActivityBlog />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Activity;
