import { Fragment, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';
import { useParams, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

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

const EditDevice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);
  const [clients, setClients] = useState([]);
  const [sites, setSites] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [mobiles, setMobiles] = useState([]);

  useEffect(() => {
    const fetchMobiles = async () => {
      const { data, error } = await supabase
        .from('mobiles')
        .select('id, unique_id')
        .order('unique_id', { ascending: true });
      if (error) {
        toast.error(`Error fetching mobiles: ${error.message}`);
      } else {
        setMobiles(data);
      }
    };

    fetchMobiles();
  }, []);

  useEffect(() => {
    const fetchDevice = async () => {
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast.error(`Error fetching device: ${error.message}`);
      } else {
        setDevice(data);
        // Cargar sitios y facilities correspondientes al dispositivo
        if (data.client_id) {
          await fetchSites(data.client_id);
          if (data.site_ksec_id) {
            const site = await supabase
              .from('sites')
              .select('id')
              .eq('ksec_id', data.site_ksec_id)
              .eq('client_id', data.client_id)
              .single();
            if (site.data) {
              await fetchFacilities(site.data.id);
            }
          }
        }
      }
    };

    fetchDevice();
  }, [id]);

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

    fetchClients();
  }, []);

  const fetchSites = async (clientId) => {
    const { data, error } = await supabase
      .from('sites')
      .select('id, name, ksec_id, client_id')
      .eq('client_id', clientId);

    if (error) {
      toast.error(`Error fetching sites: ${error.message}`);
    } else {
      setSites(data);
    }
  };

  const fetchFacilities = async (siteId) => {
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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Encontrar el sitio seleccionado
      const selectedSite = sites.find(
        (site) => site.ksec_id === parseInt(values.site_ksec_id, 10)
      );

      if (!selectedSite) {
        throw new Error('Selected site not found');
      }

      // Encontrar el facility seleccionado (si existe)
      let selectedFacility = null;
      if (values.facility_ksec_id) {
        selectedFacility = facilities.find(
          (facility) =>
            facility.ksec_id === parseInt(values.facility_ksec_id, 10)
        );
      }

      const cleanedValues = {
        mobile_id: values.mobile_id,
        client_id: values.client_id,
        site_id: selectedSite.id,
        site_ksec_id: values.site_ksec_id,
        facility_id: selectedFacility?.id || null,
        facility_ksec_id: selectedFacility?.ksec_id || null,
        location: values.location.trim(),
        mode: values.mode,
      };

      const { error } = await supabase
        .from('devices')
        .update(cleanedValues)
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast.success('Device updated successfully!');
      navigate('/devices'); // Redirigir después de actualizar
    } catch (error) {
      console.error('Supabase Error:', error);
      toast.error(`Error updating device: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (!device) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Device</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <Formik
                  initialValues={{
                    mobile_id: device.mobile_id || '',
                    client_id: device.client_id,
                    site_ksec_id: device.site_ksec_id,
                    facility_ksec_id: device.facility_ksec_id || '',
                    location: device.location,
                    mode: device.mode,
                  }}
                  validationSchema={deviceSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
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
                              placeholder="Select Unique ID"
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
                              onChange={async (e) => {
                                const clientId = e.target.value;
                                setFieldValue('client_id', clientId);
                                setFieldValue('site_ksec_id', '');
                                setFieldValue('facility_ksec_id', '');
                                await fetchSites(clientId);
                                setFacilities([]); // limpiar facilities
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
                              disabled={!values.client_id}
                              onChange={async (e) => {
                                const ksecId = e.target.value;
                                setFieldValue('site_ksec_id', ksecId);
                                setFieldValue('facility_ksec_id', '');
                                // Buscar el site por ksec_id y obtener el id real
                                const selectedSite = sites.find(
                                  (site) =>
                                    String(site.ksec_id) === String(ksecId)
                                );
                                if (selectedSite) {
                                  await fetchFacilities(selectedSite.id);
                                } else {
                                  setFacilities([]);
                                }
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
                            {isSubmitting ? 'Updating...' : 'Update Device'}
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

export default EditDevice;
