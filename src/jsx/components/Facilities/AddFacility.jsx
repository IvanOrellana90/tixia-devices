import { Fragment, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';
import PageTitle from '../../layouts/PageTitle';

// Esquema de validación con Yup
const facilitySchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),
  client_id: Yup.string().required('Client is required'),
  site_id: Yup.string().required('Site ID is required'),
  ksec_id: Yup.string().required('KSEC ID is required'),
});

const AddFacility = () => {
  const [sites, setSites] = useState([]);
  const [clients, setClients] = useState([]);

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

  // Función para enviar datos a Supabase
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Limpiar espacios en blanco con trim()
      const cleanedValues = {
        name: values.name.trim(),
        site_id: values.site_id.trim(),
        ksec_id: values.ksec_id.trim(),
      };

      const { data, error } = await supabase
        .from('facilities')
        .insert([cleanedValues]);

      if (error) {
        throw error;
      }

      // Mostrar mensaje de éxito con react-toastify
      toast.success('Facility created successfully!');
      resetForm(); // Limpiar el formulario después de guardar
    } catch (error) {
      // Mostrar mensaje de error con react-toastify
      toast.error(`Error creating facility: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Add Facility" motherMenu="Facility" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Facility</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <Formik
                  initialValues={{
                    name: '',
                    client_id: '',
                    site_id: '',
                    ksec_id: '',
                  }}
                  validationSchema={facilitySchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                      <div className="row">
                        <div className="col-lg-6 mb-2">
                          <div className="form-group mb-3">
                            <label className="text-label">
                              Name <span className="required">*</span>
                            </label>
                            <Field
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Facility Name"
                            />
                            <ErrorMessage
                              name="name"
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
                                setFieldValue('site_id', ''); // Resetear site_id
                                fetchSites(e.target.value); // Obtener sites filtrados
                              }}
                            >
                              <option value="">Select a Client</option>
                              {clients.map((client) => (
                                <option key={client.id} value={client.id}>
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
                              Site <span className="required">*</span>
                            </label>
                            <Field
                              as="select"
                              name="site_id"
                              className="form-control"
                              disabled={!values.client_id}
                            >
                              <option value="">Select a site</option>
                              {sites.map((site) => (
                                <option key={site.id} value={site.id}>
                                  {site.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="site_id"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 mb-2">
                          <div className="form-group mb-3">
                            <label className="text-label">
                              KSEC ID <span className="required">*</span>
                            </label>
                            <Field
                              type="text"
                              name="ksec_id"
                              className="form-control"
                              placeholder="KSEC ID"
                            />
                            <ErrorMessage
                              name="ksec_id"
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
                            {isSubmitting ? 'Saving...' : 'Save Facility'}
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

export default AddFacility;
