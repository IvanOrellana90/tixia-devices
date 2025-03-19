import { Fragment, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';
import 'react-toastify/dist/ReactToastify.css';

// Esquema de validación con Yup para dispositivos
const deviceSchema = Yup.object().shape({
  unique_id: Yup.string()
    .min(3, 'Unique ID must be at least 3 characters')
    .max(50, 'Unique ID cannot exceed 50 characters')
    .required('Unique ID is required'),
  model: Yup.string()
    .min(3, 'Model must be at least 3 characters')
    .max(50, 'Model cannot exceed 50 characters')
    .required('Model is required'),
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
  const [clients, setClients] = useState([]); // Estado para almacenar la lista de clientes
  const [sites, setSites] = useState([]); // Estado para almacenar la lista de sites
  const [facilities, setFacilities] = useState([]); // Estado para almacenar la lista de facilities

  // Obtener la lista de clientes al cargar el componente
  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name, url');
      if (error) {
        toast.error(`Error fetching clients: ${error.message}`);
      } else {
        setClients(data); // Guardar los clientes en el estado
      }
    };

    fetchClients();
  }, []);

  // Función para obtener los sites filtrados por client_id
  const fetchSites = async (clientId) => {
    const { data, error } = await supabase
      .from('sites')
      .select('id, name, ksec_id')
      .eq('client_id', clientId);

    if (error) {
      toast.error(`Error fetching sites: ${error.message}`);
    } else {
      setSites(data); // Guardar los sites en el estado
    }
  };

  // Función para obtener los facilities filtrados por site_ksec_id
  const fetchFacilities = async (siteId) => {
    const { data, error } = await supabase
      .from('facilities')
      .select('id, name, ksec_id')
      .eq('site_id', siteId);

    if (error) {
      toast.error(`Error fetching facilities: ${error.message}`);
    } else {
      setFacilities(data); // Guardar los facilities en el estado
    }
  };

  // Función para enviar datos a Supabase
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Limpiar espacios en blanco con trim()
      const cleanedValues = {
        unique_id: values.unique_id.trim(),
        model: values.model.trim(),
        client_id: values.client_id.trim(),
        site_ksec_id: values.site_ksec_id.trim(),
        facility_ksec_id: values.facility_ksec_id.trim() || null,
        location: values.location.trim(),
        mode: values.mode.trim(),
      };

      console.log(cleanedValues);

      const { data, error } = await supabase
        .from('devices')
        .insert([cleanedValues]);

      if (error) {
        throw error;
      }

      // Mostrar mensaje de éxito con react-toastify
      toast.success('Device created successfully!');
      resetForm(); // Limpiar el formulario después de guardar
    } catch (error) {
      // Mostrar mensaje de error con react-toastify
      toast.error(`Error creating device: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
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
                    unique_id: '',
                    model: '',
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
                              type="text"
                              name="unique_id"
                              className="form-control"
                              placeholder="Device Unique ID"
                            />
                            <ErrorMessage
                              name="unique_id"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 mb-2">
                          <div className="form-group mb-3">
                            <label className="text-label">
                              Model <span className="required">*</span>
                            </label>
                            <Field
                              type="text"
                              name="model"
                              className="form-control"
                              placeholder="Device Model"
                            />
                            <ErrorMessage
                              name="model"
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
