import { Fragment, useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';
import { useParams, useNavigate } from 'react-router-dom';

const mobileSchema = Yup.object().shape({
  active: Yup.boolean(),
  is_rented: Yup.boolean(),
  has_sim_card: Yup.boolean(),
});

const EditMobile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(null);

  useEffect(() => {
    const fetchMobile = async () => {
      const { data, error } = await supabase
        .from('mobiles')
        .select('*')
        .eq('id', id)
        .single();
      if (error) toast.error(`Error fetching mobile: ${error.message}`);
      else setMobile(data);
    };
    fetchMobile();
  }, [id]);

  if (!mobile) return <div>Loading...</div>;

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Mobile</h4>
            </div>
            <div className="card-body">
              <Formik
                initialValues={{
                  active: !!mobile.active,
                  is_rented: !!mobile.is_rented,
                  has_sim_card: !!mobile.has_sim_card,
                }}
                validationSchema={mobileSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const { error } = await supabase
                      .from('mobiles')
                      .update({
                        active: values.active,
                        is_rented: values.is_rented,
                        has_sim_card: values.has_sim_card,
                        updated_at: new Date().toISOString(),
                      })
                      .eq('id', id);
                    if (error) throw error;
                    toast.success('Mobile updated successfully!');
                    navigate('/mobiles');
                  } catch (e) {
                    toast.error(`Error updating mobile: ${e.message}`);
                  } finally {
                    setSubmitting(false);
                  }
                }}
                enableReinitialize
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form>
                    <div className="row">
                      {/* IMEI (read-only) */}
                      <div className="col-lg-6 mb-2">
                        <div className="form-group mb-3">
                          <label className="text-label">IMEI</label>
                          <input
                            type="text"
                            className="form-control"
                            value={mobile.imei || ''}
                            readOnly
                            disabled
                          />
                        </div>
                      </div>
                      {/* Model (read-only) */}
                      <div className="col-lg-6 mb-2">
                        <div className="form-group mb-3">
                          <label className="text-label">Model</label>
                          <input
                            type="text"
                            className="form-control"
                            value={mobile.model || ''}
                            readOnly
                            disabled
                          />
                        </div>
                      </div>

                      {/* State */}
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

                      {/* Rented */}
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

                      {/* SIM Card */}
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

                      <div className="col-lg-12">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Updating...' : 'Update Mobile'}
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

export default EditMobile;
