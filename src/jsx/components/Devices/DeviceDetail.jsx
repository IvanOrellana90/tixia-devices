import { useEffect, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import PageTitle from '../../layouts/PageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMobile,
  faMobileScreenButton,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';

const DeviceDetail = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const fetchDevice = async () => {
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.error('Error fetching device:', error.message);
      console.log('Device:', data);
      setDevice(data);
    };
    fetchDevice();
  }, [id]);

  return (
    <Fragment>
      <PageTitle activeMenu="Device Detail" motherMenu="Devices" />
      <div className="row">
        <div className="col-xl-12 col-xxl-12 col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="clearfix pe-md-5">
                <h3 className="display-6 mb-2">{device.location}</h3>

                <ul className="d-flex flex-wrap fs-6 align-items-center">
                  <li className="me-3 d-inline-flex align-items-center">
                    <FontAwesomeIcon
                      icon={faMobileScreenButton}
                      className="las la-user me-1 fs-18"
                    />
                    {device?.model}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-3 col-xxl-4 col-sm-6">
          <div className="card">
            <div className="card-body">
              {/* Encabezado con logo y título */}
              <div className="clearfix d-flex">
                <div className="clearfix">
                  <h6 className="mb-0 fw-semibold">Time online</h6>
                  <span className="text-muted fs-13">
                    There are many variations
                  </span>
                </div>
              </div>

              {/* Descripción */}
              <p className="my-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>

              {/* Progreso */}
              <div className="mt-3">
                <div className="d-flex justify-content-between">
                  <span className="fw-medium">Project Complete</span>
                  <span>60%</span>
                </div>
                <div className="progress mt-2">
                  <div
                    className="progress-bar bg-success"
                    style={{ width: '60%', borderRadius: '4px' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Pie de tarjeta */}
            <div className="card-footer d-flex justify-content-between flex-wrap">
              <div className="due-progress mb-0">
                <p className="mb-0">
                  Create at
                  <span className="text-purple">
                    : {moment(device?.created_at).format('DD MMM YYYY, h:mm A')}
                  </span>
                </p>
              </div>
              <span className="badge badge-sm light border-0 badge-primary">
                In Progress
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DeviceDetail;
