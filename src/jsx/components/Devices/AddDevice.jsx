import { Fragment, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../../layouts/PageTitle';

const deviceSchema = Yup.object().shape({
  mobile_id: Yup.string().required('Unique ID is required'),
  client_id: Yup.string().required('Client ID is required'),
  site_ksec_id: Yup.string().required('Site KSEC ID is required'),
  location: Yup.string()
    .min(3, 'Location must be at least 3 characters')
    .max(100, 'Location cannot exceed 100 characters')
    .required('Location is required'),
  mode: Yup.string()
    .oneOf(['Tourniquet', 'Kiosk', 'PDA'], 'Invalid mode selected')
    .required('Mode is required'),
});

const AddDevice = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [sites, setSites] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [mobiles, setMobiles] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name, url');

      if (error) {
        toast.error(`Error fetching clients: ${error.message}`);
      } else {
        setClients(data);
      }
    };

    const fetchMobiles = async () => {
      const { data, error } = await supabase
        .from('mobiles')
        .select('id, unique_id')
        .order('unique_id', { ascending: true });
      if (!error) setMobiles(data);
    };

    fetchClients();
    fetchMobiles();
  }, []);

  const fetchSites = async (clientId) => {
    if (!clientId) {
      setSites([]);
      setFacilities([]);
      return;
    }

    const { data, error } = await supabase
      .from('sites')
      .select('id, name, ksec_id, client_id')
      .eq('client_id', clientId);

    if (error) {
      toast.error(`Error fetching sites: ${error.message}`);
    } else {
      setSites(data);
      setFacilities([]); // Reset facilities when sites change
    }
  };

  const fetchFacilities = async (siteId) => {
    if (!siteId) {
      setFacilities([]);
      return;
    }

    const { data, error } = await supabase
      .from('facilities')
      .select('id, name, ksec_id, site_id')
      .eq('site_id', siteId);

    if (error) {
      toast.error(`Error fetching facilities: ${error.message}`);
    } else {
      setFacilities(data);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Validar que el sitio pertenece al cliente seleccionado
      const selectedSite = sites.find(
        (site) => site.ksec_id === parseInt(values.site_ksec_id, 10)
      );

      if (!selectedSite) {
        throw new Error(
          'Selected site not found or does not belong to the selected client'
        );
      }

      let selectedFacility = null;
      if (values.facility_ksec_id) {
        selectedFacility = facilities.find(
          (facility) =>
            facility.ksec_id === parseInt(values.facility_ksec_id, 10)
        );
        if (!selectedFacility) {
          throw new Error(
            'Selected facility not found or does not belong to the selected site'
          );
        }
      }

      const deviceData = {
        mobile_id: values.mobile_id, // Ahora es el id del mobile seleccionado
        client_id: values.client_id,
        site_id: selectedSite.id,
        site_ksec_id: values.site_ksec_id,
        facility_id: selectedFacility?.id || null,
        facility_ksec_id: selectedFacility?.ksec_id || null,
        location: values.location.trim(),
        mode: values.mode,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('devices').insert([deviceData]);

      if (error) throw error;

      toast.success('Device created successfully!');
      resetForm();
      navigate('/devices');
    } catch (error) {
      toast.error(error.message || 'Error creating device');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Add Device" motherMenu="Device" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Device</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <Formik
                  initialValues={{
                    mobile_id: '',
                    client_id: '',
                    site_ksec_id: '',
                    facility_ksec_id: '',
                    location: '',
                    mode: '',
                  }}
                  validationSchema={deviceSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                      <div className="row">
                        <div className="col-lg-6 mb-2">
                          <div className="form-group mb-3">
                            <label className="text-label">
                              Unique ID <span className="required">*</span>
                            </label>
                            <Field
                              as="select"
                              name="mobile_id"
                              className="form-control"
                            >
                              <option value="">Select Unique ID</option>
                              {mobiles.map((mobile) => (
                                <option key={mobile.id} value={mobile.id}>
                                  {mobile.unique_id}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="mobile_id"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 mb-2">
                          <div className="form-group mb-3">
                            <label className="text-label">
                              Client <span className="required">*</span>
                            </label>
                            <Field
                              as="select"
                              name="client_id"
                              className="form-control"
                              onChange={(e) => {
                                setFieldValue('client_id', e.target.value);
                                setFieldValue('site_ksec_id', ''); // Resetear site_ksec_id
                                setFieldValue('facility_ksec_id', ''); // Resetear facility_ksec_id
                                fetchSites(
                                  e.target.selectedOptions[0].getAttribute(
                                    'data-id'
                                  )
                                ); // Obtener sites filtrados
                              }}
                            >
                              <option value="">Select a Client</option>
                              {clients.map((client) => (
                                <option
                                  key={client.id}
                                  value={client.id}
                                  data-id={client.id}
                                >
                                  {client.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="client_id"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 mb-2">
                          <div className="form-group mb-3">
                            <label className="text-label">
                              Site KSEC ID <span className="required">*</span>
                            </label>
                            <Field
                              as="select"
                              name="site_ksec_id"
                              className="form-control"
                              disabled={!values.client_id} // Deshabilitar si no hay client_id
                              onChange={(e) => {
                                setFieldValue('site_ksec_id', e.target.value);
                                setFieldValue('facility_ksec_id', ''); // Resetear facility_ksec_id
                                fetchFacilities(
                                  e.target.selectedOptions[0].getAttribute(
                                    'data-id'
                                  )
                                ); // Obtener facilities filtrados
                              }}
                            >
                              <option value="">Select a Site</option>
                              {sites.map((site) => (
                                <option
                                  key={site.id}
                                  value={site.ksec_id}
                                  data-id={site.id}
                                >
                                  {site.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="site_ksec_id"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 mb-2">
                          <div className="form-group mb-3">
                            <label className="text-label">
                              Facility KSEC ID{' '}
                            </label>
                            <Field
                              as="select"
                              name="facility_ksec_id"
                              className="form-control"
                              disabled={!values.site_ksec_id} // Deshabilitar si no hay site_ksec_id
                            >
                              <option value="">Select a Facility</option>
                              {facilities.map((facility) => (
                                <option
                                  key={facility.id}
                                  value={facility.ksec_id}
                                >
                                  {facility.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="facility_ksec_id"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 mb-2">
                          <div className="form-group mb-3">
                            <label className="text-label">
                              Location <span className="required">*</span>
                            </label>
                            <Field
                              type="text"
                              name="location"
                              className="form-control"
                              placeholder="Device Location"
                            />
                            <ErrorMessage
                              name="location"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 mb-2">
                          <div className="form-group mb-3">
                            <label className="text-label">
                              Mode <span className="required">*</span>
                            </label>
                            <Field
                              as="select"
                              name="mode"
                              className="form-control"
                            >
                              <option value="">Select Mode</option>
                              <option value="Tourniquet">Tourniquet</option>
                              <option value="Kiosk">Kiosk</option>
                              <option value="PDA">PDA</option>
                            </Field>
                            <ErrorMessage
                              name="mode"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Saving...' : 'Save Device'}
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddDevice;
