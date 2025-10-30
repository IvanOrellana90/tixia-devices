import { Fragment, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PageTitle from '../../layouts/PageTitle';

const visitSchema = Yup.object().shape({
  client_id: Yup.number()
    .transform((v, o) => (o === '' ? undefined : Number(o)))
    .required('Client is required'),
  site_id: Yup.number()
    .transform((v, o) => (o === '' ? undefined : Number(o)))
    .required('Site is required'),
  facility_id: Yup.number()
    .transform((v, o) => (o === '' ? null : Number(o)))
    .nullable(),
  date: Yup.date().required('Date is required'),
  type: Yup.string().required('Visit type is required'),
  status: Yup.string().required('Status is required'),
  description: Yup.string()
    .min(5, 'Description too short')
    .required('Description is required'),
});

const AddVisit = () => {
  const [clients, setClients] = useState([]);
  const [sites, setSites] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigate = useNavigate();

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: profile } = await supabase
            .from('users')
            .select('id')
            .eq('auth_user_id', user.id)
            .single();
          if (profile) setCurrentUserId(profile.id);
        }

        const { data: clientList, error: clientError } = await supabase
          .from('clients')
          .select('id, name')
          .order('name', { ascending: true });
        if (clientError) throw clientError;
        setClients(clientList || []);
      } catch (error) {
        toast.error('Error loading form data');
      }
    };
    fetchData();
  }, []);

  const handleClientChange = async (clientId, setFieldValue) => {
    setFieldValue('site_id', '');
    setFieldValue('facility_id', '');
    setFacilities([]);
    try {
      const { data, error } = await supabase
        .from('sites')
        .select('id, name')
        .eq('client_id', clientId)
        .order('name', { ascending: true });
      if (error) throw error;
      setSites(data);
    } catch {
      toast.error('Error loading sites');
    }
  };

  const handleSiteChange = async (siteId, setFieldValue) => {
    setFieldValue('facility_id', '');
    try {
      const { data, error } = await supabase
        .from('facilities')
        .select('id, name')
        .eq('site_id', siteId)
        .order('name', { ascending: true });
      if (error) throw error;
      setFacilities(data);
    } catch {
      toast.error('Error loading facilities');
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const cleanedValues = {
        ...values,
        client_id: parseInt(values.client_id, 10),
        site_id: parseInt(values.site_id, 10),
        facility_id: values.facility_id
          ? parseInt(values.facility_id, 10)
          : null,
        description: values.description.trim(),
        created_by: currentUserId,
        date: selectedDate,
      };

      const { error } = await supabase.from('visits').insert([cleanedValues]);
      if (error) throw error;

      toast.success('Visit created successfully!');
      navigate('/visit-list');
    } catch (error) {
      toast.error(`Error creating visit: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <PageTitle activeMenu="New Visit" motherMenu="Visits" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Register New Visit</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <Formik
                  initialValues={{
                    client_id: '',
                    site_id: '',
                    facility_id: '',
                    date: selectedDate,
                    type: 'corrective',
                    status: 'scheduled',
                    description: '',
                  }}
                  validationSchema={visitSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                      <div className="row">
                        {/* CLIENT */}
                        <div className="col-lg-4 mb-2">
                          <label>
                            Client <span className="required">*</span>
                          </label>
                          <Field
                            as="select"
                            name="client_id"
                            className="form-control"
                            onChange={(e) => {
                              setFieldValue('client_id', e.target.value);
                              handleClientChange(e.target.value, setFieldValue);
                            }}
                          >
                            <option value="">Select Client</option>
                            {clients.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="client_id"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        {/* SITE */}
                        <div className="col-lg-4 mb-2">
                          <label>
                            Site <span className="required">*</span>
                          </label>
                          <Field
                            as="select"
                            name="site_id"
                            className="form-control"
                            onChange={(e) => {
                              setFieldValue('site_id', e.target.value);
                              handleSiteChange(e.target.value, setFieldValue);
                            }}
                            disabled={!values.client_id}
                          >
                            <option value="">Select Site</option>
                            {sites.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="site_id"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        {/* FACILITY */}
                        <div className="col-lg-4 mb-2">
                          <label>Facility</label>
                          <Field
                            as="select"
                            name="facility_id"
                            className="form-control"
                            disabled={!values.site_id}
                          >
                            <option value="">Select Facility</option>
                            {facilities.map((f) => (
                              <option key={f.id} value={f.id}>
                                {f.name}
                              </option>
                            ))}
                          </Field>
                        </div>

                        {/* DATE PICKER with TIME */}
                        <div className="col-lg-4 mb-2">
                          <label>
                            Date & Time <span className="required">*</span>
                          </label>
                          <DatePicker
                            className="form-control"
                            selected={selectedDate}
                            onChange={(date) => {
                              setSelectedDate(date);
                              setFieldValue('date', date);
                            }}
                            showTimeInput
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                          />
                          <ErrorMessage
                            name="date"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        {/* TYPE */}
                        <div className="col-lg-4 mb-2">
                          <label>
                            Type <span className="required">*</span>
                          </label>
                          <Field
                            as="select"
                            name="type"
                            className="form-control"
                          >
                            <option value="corrective">Corrective</option>
                            <option value="preventive">Preventive</option>
                            <option value="installation">Installation</option>
                          </Field>
                          <ErrorMessage
                            name="type"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        {/* STATUS */}
                        <div className="col-lg-4 mb-2">
                          <label>
                            Status <span className="required">*</span>
                          </label>
                          <Field
                            as="select"
                            name="status"
                            className="form-control"
                          >
                            <option value="scheduled">Scheduled</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="canceled">Canceled</option>
                          </Field>
                          <ErrorMessage
                            name="status"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        {/* DESCRIPTION */}
                        <div className="col-lg-12 mb-3">
                          <label>
                            Description <span className="required">*</span>
                          </label>
                          <Field
                            as="textarea"
                            name="description"
                            className="form-control"
                            rows="3"
                            placeholder="Describe the visit details..."
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        {/* SUBMIT */}
                        <div className="col-lg-12">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting || !currentUserId}
                          >
                            {isSubmitting ? 'Saving...' : 'Save Visit'}
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

export default AddVisit;
