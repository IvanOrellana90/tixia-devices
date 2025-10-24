import { Fragment, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../../layouts/PageTitle';

// 🧩 Esquema de validación
const userSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'First name too short')
    .max(50, 'Too long')
    .required('First name is required'),
  last_name: Yup.string()
    .min(2, 'Last name too short')
    .max(50, 'Too long')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+?\d{7,15}$/, 'Invalid phone format')
    .nullable(),
  role: Yup.string()
    .oneOf(['admin', 'viewer'], 'Invalid role')
    .required('Role is required'),
});

const EditUser = () => {
  const { id } = useParams(); // /users/edit/:id
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🚀 Cargar datos del usuario
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;

        setInitialValues({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          role: data.role || 'viewer',
        });
      } catch (error) {
        toast.error(`Error loading user: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // 💾 Guardar cambios
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const cleanedValues = {
        ...values,
        email: values.email.trim().toLowerCase(),
        first_name: values.first_name.trim(),
        last_name: values.last_name.trim(),
        phone: values.phone?.trim() || null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('users')
        .update(cleanedValues)
        .eq('id', id);

      if (error) throw error;

      toast.success('User updated successfully!');
      navigate('/user-list');
    } catch (error) {
      toast.error(`Error updating user: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading user data...</p>;
  }

  if (!initialValues) {
    return <p className="text-center mt-5 text-danger">User not found.</p>;
  }

  return (
    <Fragment>
      <PageTitle activeMenu="Edit User" motherMenu="Users" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit User</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <Formik
                  initialValues={initialValues}
                  enableReinitialize
                  validationSchema={userSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="row">
                        {/* FIRST NAME */}
                        <div className="col-lg-6 mb-3">
                          <label>
                            First Name <span className="required">*</span>
                          </label>
                          <Field
                            type="text"
                            name="first_name"
                            className="form-control"
                            placeholder="Enter first name"
                          />
                          <ErrorMessage
                            name="first_name"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        {/* LAST NAME */}
                        <div className="col-lg-6 mb-3">
                          <label>
                            Last Name <span className="required">*</span>
                          </label>
                          <Field
                            type="text"
                            name="last_name"
                            className="form-control"
                            placeholder="Enter last name"
                          />
                          <ErrorMessage
                            name="last_name"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        {/* EMAIL */}
                        <div className="col-lg-6 mb-3">
                          <label>
                            Email <span className="required">*</span>
                          </label>
                          <Field
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email address"
                            disabled // Evitamos cambiar el email base
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        {/* PHONE */}
                        <div className="col-lg-6 mb-3">
                          <label>Phone</label>
                          <Field
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="+56912345678"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        {/* ROLE */}
                        <div className="col-lg-6 mb-3">
                          <label>
                            Role <span className="required">*</span>
                          </label>
                          <Field
                            as="select"
                            name="role"
                            className="form-control"
                          >
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                          </Field>
                          <ErrorMessage
                            name="role"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        {/* SUBMIT */}
                        <div className="col-lg-12">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Saving...' : 'Update User'}
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => navigate('/user-list')}
                          >
                            Cancel
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

export default EditUser;
