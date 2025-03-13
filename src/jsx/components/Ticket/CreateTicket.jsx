import { Fragment } from 'react';
import Select from 'react-select';
import PageTitle from '../../layouts/PageTitle';
import CkEditorBlog from '../Forms/CkEditor/CkEditorBlog';
import DropFile from '../AppsMenu/Email/Compose/DropFile';

const options = [
  { value: '1', label: 'Alabama' },
  { value: '1', label: 'Wyoming' },
];

export default function CreateTicket() {
  return (
    <Fragment>
      <PageTitle activeMenu={'Create Ticket'} motherMenu={'Ticket'} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="form-validation">
                <div className="needs-validation">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="mb-3 row">
                        <label
                          className="col-lg-3 col-form-label form-label required"
                          for="validationCustom01"
                        >
                          Ticket Subject
                        </label>
                        <div className="col-lg-9">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            placeholder="Subject"
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter a username.
                          </div>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-lg-3 col-form-label form-label required">
                          Email address
                        </label>
                        <div className="col-lg-9">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Your valid email.."
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter a Email.
                          </div>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-lg-3 col-form-label form-label required">
                          Ticket Category
                        </label>
                        <div className="col-lg-9 Cms-selecter">
                          <Select
                            options={options}
                            className="custom-react-select"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-lg-3 col-form-label form-label required">
                          Ticket Description
                        </label>

                        <div className="col-lg-9">
                          <div className="custom-ekeditor ct-ticket">
                            <CkEditorBlog />
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-lg-3 col-form-label form-label required">
                          Attatchment{' '}
                        </label>
                        <div className="col-lg-9">
                          <div className="ticket-file">
                            <DropFile />
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 row">
                        <div className="col-lg-9 ms-auto">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
