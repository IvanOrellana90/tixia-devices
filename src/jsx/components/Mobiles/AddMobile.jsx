import { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';
import PageTitle from '../../layouts/PageTitle';

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
  active: Yup.boolean(),
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
        active: values.active,
      };

      const { error } = await supabase.from('mobiles').insert([cleanedValues]);

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
              <h4 className="card-title">New Mobile</h4>
            </div>
            <div className="card-body">
              <Formik
                initialValues={{
                  imei: '',
                  model: '',
                  has_sim_card: false,
                  is_rented: false,
                  active: true,
                }}
                validationSchema={mobileSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, setFieldValue }) => (
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
                      {/* Active */}
                      <div className="col-lg-6 mb-2">
                        <div className="form-group mb-3">
                          <label className="text-label">State</label>
                          <Field
                            as="select"
                            name="active"
                            className="form-control"
                            value={values.active ? 'true' : 'false'}
                            onChange={(e) =>
                              setFieldValue('active', e.target.value === 'true')
                            }
                          >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                          </Field>
                        </div>
                      </div>
                      {/* has_sim_card */}
                      <div className="col-lg-6 mb-2">
                        <div className="form-group mb-3">
                          <label className="text-label">SIM Card</label>
                          <Field
                            as="select"
                            name="has_sim_card"
                            className="form-control"
                            value={values.has_sim_card ? 'true' : 'false'}
                            onChange={(e) =>
                              setFieldValue(
                                'has_sim_card',
                                e.target.value === 'true'
                              )
                            }
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Field>
                        </div>
                      </div>
                      {/* is_rented */}
                      <div className="col-lg-6 mb-2">
                        <div className="form-group mb-3">
                          <label className="text-label">Rented</label>
                          <Field
                            as="select"
                            name="is_rented"
                            className="form-control"
                            value={values.is_rented ? 'true' : 'false'}
                            onChange={(e) =>
                              setFieldValue(
                                'is_rented',
                                e.target.value === 'true'
                              )
                            }
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Field>
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
