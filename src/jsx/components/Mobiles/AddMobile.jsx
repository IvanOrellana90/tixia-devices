import { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';
import PageTitle from '../../layouts/PageTitle';

// Esquema de validación con Yup
const mobileSchema = Yup.object().shape({
  imei: Yup.string()
    .min(5, 'IMEI must be at least 5 characters')
    .max(50, 'IMEI cannot exceed 50 characters')
    .required('IMEI is required'),
  model: Yup.string()
    .min(2, 'Model must be at least 2 characters')
    .max(50, 'Model cannot exceed 50 characters')
    .required('Model is required'),
  has_sim_card: Yup.boolean(),
  is_rented: Yup.boolean(),
});

const AddMobile = () => {
  // Función para enviar datos a Supabase
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const cleanedValues = {
        imei: values.imei.trim(),
        model: values.model.trim(),
        has_sim_card: values.has_sim_card,
        is_rented: values.is_rented,
      };

      const { data, error } = await supabase
        .from('mobiles')
        .insert([cleanedValues]);

      if (error) throw error;

      toast.success('Mobile created successfully!');
      resetForm();
    } catch (error) {
      toast.error(`Error creating mobile: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Add Mobile" motherMenu="Mobiles" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Mobile Device</h4>
            </div>
            <div className="card-body">
              <Formik
                initialValues={{
                  imei: '',
                  model: '',
                  has_sim_card: false,
                  is_rented: false,
                }}
                validationSchema={mobileSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="row">
                      <div className="col-lg-6 mb-2">
                        <div className="form-group mb-3">
                          <label className="text-label">
                            IMEI <span className="required">*</span>
                          </label>
                          <Field
                            type="text"
                            name="imei"
                            className="form-control"
                            placeholder="Enter IMEI"
                          />
                          <ErrorMessage
                            name="imei"
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
                            placeholder="Enter Model"
                          />
                          <ErrorMessage
                            name="model"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-2">
                        <div className="form-check mb-3">
                          <Field
                            type="checkbox"
                            name="has_sim_card"
                            className="form-check-input"
                            id="has_sim_card"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="has_sim_card"
                          >
                            Has SIM Card
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-6 mb-2">
                        <div className="form-check mb-3">
                          <Field
                            type="checkbox"
                            name="is_rented"
                            className="form-check-input"
                            id="is_rented"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="is_rented"
                          >
                            Is Rented
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Saving...' : 'Save Mobile'}
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
    </Fragment>
  );
};

export default AddMobile;
