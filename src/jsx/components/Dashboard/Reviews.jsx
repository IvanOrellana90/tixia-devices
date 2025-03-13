import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Tab } from 'react-bootstrap';
import AllReview from './AllReview';
import PublishReview from './PublishReview';
import DeleteReview from './DeleteReview';

const Reviews = () => {
  return (
    <div className="row">
      <Tab.Container defaultActiveKey="allreview">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body px-4 py-3 py-md-2">
              <div className="row align-items-center">
                <div className="col-sm-12 col-md-7">
                  <Nav as="ul" className="nav nav-pills review-tab">
                    <Nav.Item as="li" className="nav-item">
                      <Nav.Link
                        to="navpills-1"
                        className="nav-link px-2 px-lg-3"
                        aria-expanded="false"
                        eventKey="allreview"
                      >
                        All Review
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-item">
                      <Nav.Link
                        to="navpills-2"
                        className="nav-link px-2 px-lg-3"
                        aria-expanded="false"
                        eventKey="published"
                      >
                        Published
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-item">
                      <Nav.Link
                        to="navpills-3"
                        className="nav-link px-2 px-lg-3"
                        aria-expanded="true"
                        eventKey="deleted"
                      >
                        Deleted
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
                <div className="col-sm-12 col-md-5 text-md-end mt-md-0 mt-4">
                  <Link
                    to="/reviews"
                    className="btn btn-primary me-1 px-4 btn-sm"
                  >
                    Publish
                  </Link>
                  <Link to="/reviews" className="btn btn-danger px-4 btn-sm">
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-12">
          <Tab.Content className="tab-content">
            <Tab.Pane eventKey="allreview" id="navpills-1" className="tab-pane">
              <AllReview />
            </Tab.Pane>
            <Tab.Pane eventKey="published" id="navpills-2" className="tab-pane">
              <PublishReview />
            </Tab.Pane>
            <Tab.Pane eventKey="deleted" id="navpills-3" className="tab-pane">
              <DeleteReview />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </div>
  );
};

export default Reviews;
