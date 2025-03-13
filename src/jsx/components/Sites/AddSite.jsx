import { Fragment, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { supabase } from '../../supabase/client';
import 'react-toastify/dist/ReactToastify.css';

// Esquema de validación con Yup
const siteSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),
  client_id: Yup.string().required('Client ID is required'),
  ksec_id: Yup.string().required('KSEC ID is required'),
});

const AddSite = () => {
  const [clients, setClients] = useState([]);

  // Obtener la lista de clientes desde Supabase
  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase.from('clients').select('id, name'); // Seleccionar solo el ID y el nombre de los clientes

      if (error) {
        console.error('Error fetching clients:', error.message);
        toast.error('Error loading clients.');
      } else {
        setClients(data); // Guardar la lista de clientes en el estado
      }
    };

    fetchClients();
  }, []);

  // Función para enviar datos a Supabase
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Limpiar espacios en blanco con trim()
      const cleanedValues = {
        name: values.name.trim(),
        client_id: values.client_id.trim(),
        ksec_id: values.ksec_id,
      };

      const { data, error } = await supabase
        .from('sites')
        .insert([cleanedValues]);

      if (error) {
        throw error;
      }

      // Mostrar mensaje de éxito con react-toastify
      toast.success('Site created successfully!');
      resetForm(); // Limpiar el formulario después de guardar
    } catch (error) {
      // Mostrar mensaje de error con react-toastify
      toast.error(`Error creating site: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Site</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <Formik
                  initialValues={{ name: '', client_id: '', ksec_id: '' }}
                  validationSchema={siteSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
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
                              placeholder="Site Name"
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
                              as="select" // Usar un select box
                              name="client_id"
                              className="form-control"
                            >
                              <option value="">Select a client</option>
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
                              KSEC ID <span className="required">*</span>
                            </label>
                            <Field
                              type="number"
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
                            {isSubmitting ? 'Saving...' : 'Save Site'}
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

export default AddSite;
