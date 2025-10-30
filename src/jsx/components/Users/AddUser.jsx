import { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../../layouts/PageTitle';

// 🧩 Validación con Yup
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
  company: Yup.string().nullable(),
  role: Yup.string()
    .oneOf(['admin', 'technician', 'viewer'], 'Invalid role')
    .required('Role is required'),
});

const AddUser = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const cleanedValues = {
        ...values,
        email: values.email.trim().toLowerCase(),
        first_name: values.first_name.trim(),
        last_name: values.last_name.trim(),
        company: values.company?.trim() || null,
        phone: values.phone?.trim() || null,
      };

      const { error } = await supabase.from('users').insert([cleanedValues]);
      if (error) throw error;

      toast.success('User created successfully!');
      resetForm();
    } catch (error) {
      toast.error(`Error creating user: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Add User" motherMenu="Users" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Register New User</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <Formik
                  initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    company: '',
                    role: 'technician',
                  }}
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

                        {/* COMPANY */}
                        <div className="col-lg-6 mb-3">
                          <label>Company</label>
                          <Field
                            type="text"
                            name="company"
                            className="form-control"
                            placeholder="Enter company name"
                          />
                          <ErrorMessage
                            name="company"
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
                            <option value="technician">Technician</option>
                            <option value="admin">Admin</option>
                            <option value="viewer">Viewer</option>
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
                            {isSubmitting ? 'Saving...' : 'Save User'}
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

export default AddUser;
