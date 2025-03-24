import { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../../layouts/PageTitle';

// Esquema de validación con Yup
const clientSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),
  url: Yup.string()
    .matches(
      /^https:\/\/[a-zA-Z0-9-]+\.ksec\.cl(\/.*)?$/, // Expresión regular
      'URL must be in the format https://<name>.ksec.cl/'
    )
    .required('URL is required'),
  api_key: Yup.string()
    .min(10, 'API Key must be at least 10 characters')
    .required('API Key is required'),
});

const AddClient = () => {
  // Función para enviar datos a Supabase
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Limpiar espacios en blanco con trim()
      const cleanedValues = {
        name: values.name.trim(),
        url: values.url.trim(),
        api_key: values.api_key.trim(),
      };

      const { data, error } = await supabase
        .from('clients')
        .insert([cleanedValues]);

      if (error) {
        throw error;
      }

      // Mostrar mensaje de éxito con react-toastify
      toast.success('Client created successfully!');
      resetForm(); // Limpiar el formulario después de guardar
    } catch (error) {
      // Mostrar mensaje de error con react-toastify
      toast.error(`Error creating client: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Add Client" motherMenu="Client" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Client</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <Formik
                  initialValues={{ name: '', url: '', api_key: '' }}
                  validationSchema={clientSchema}
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
                              placeholder="Client Name"
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
                              URL <span className="required">*</span>
                            </label>
                            <Field
                              type="text"
                              name="url"
                              className="form-control"
                              placeholder="https://example.ksec.cl"
                            />
                            <ErrorMessage
                              name="url"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 mb-2">
                          <div className="form-group mb-3">
                            <label className="text-label">
                              API Key <span className="required">*</span>
                            </label>
                            <Field
                              type="text"
                              name="api_key"
                              className="form-control"
                              placeholder="Enter API Key"
                            />
                            <ErrorMessage
                              name="api_key"
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
                            {isSubmitting ? 'Saving...' : 'Save Client'}
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

export default AddClient;
