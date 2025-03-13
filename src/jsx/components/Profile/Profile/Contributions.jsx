import { Fragment } from 'react';
import SocialBlogCard from './SocailBlogCard';

function Contributions() {
  return (
    <Fragment>
      <div className="card">
        <div className="card-header pb-0 border-0">
          <div className="clearfix">
            <h4 className="card-title mb-0">Projects Contributions</h4>
            <small className="d-block">84 New Tasks & 29 Guides</small>
          </div>
          <div className="clearfix ms-auto">
            <button
              type="button"
              className="btn btn-light btn-icon-xxs tp-btn fs-18 align-self-start"
            >
              <i className="bi bi-grid"></i>
            </button>
          </div>
        </div>
        <div className="card-body">
          <SocialBlogCard />
        </div>
        <div className="card-footer pt-0 border-0">
          <div className="alert alert-primary border-primary outline-dashed py-3 px-3 mt-4 mb-0 text-dark">
            <strong className="text-primary">
              Intive New .NET Collaborators
            </strong>{' '}
            to creating great outstanding business to business .jsp modutr class
            scripts
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Contributions;
