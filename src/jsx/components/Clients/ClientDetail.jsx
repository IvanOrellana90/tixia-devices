import { useEffect, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../layouts/PageTitle';

const ClientDetail = () => {
    const { id } = useParams();
    // const [client, setClient] = useState(null);

    return (
        <Fragment>
            <PageTitle activeMenu="Client Detail" motherMenu="Clients" />

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                {/* Client Info */}
                                <div className="col-md-9">
                                    <div className="clearfix pe-md-5">
                                        <div className="d-flex align-items-center mb-3">
                                            <h3 className="display-6 mb-0 me-3">
                                                <strong>Client Name Placeholder</strong>
                                            </h3>
                                        </div>
                                        <ul className="d-flex flex-column fs-6">
                                            {/* Placeholder list items */}
                                            <li className="mb-1 d-flex align-items-center">
                                                <span className="fw-light me-2">Detail 1:</span>
                                                Value
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Actions and Status */}
                                <div className="col-md-3">
                                    <div className="clearfix mt-3 mt-xl-0 ms-auto d-flex flex-column">
                                        <div className="clearfix mb-3 text-xl-center">
                                            {/* Status placeholders */}
                                            <div className="alert alert-secondary">Status Placeholder</div>
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
};

export default ClientDetail;
