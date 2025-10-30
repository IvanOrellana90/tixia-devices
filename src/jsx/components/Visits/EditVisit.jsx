import { Fragment, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PageTitle from '../../layouts/PageTitle';
import VisitTechniciansCard from './VisitTechniciansCard';
import VisitDevicesCard from './VisitDevicesCard';

// ✅ Validación Yup
const visitSchema = Yup.object().shape({
  client_id: Yup.number().required('Client is required'),
  site_id: Yup.number().required('Site is required'),
  facility_id: Yup.number().nullable(),
  date: Yup.date().required('Date is required'),
  scheduled_start: Yup.date().nullable(),
  scheduled_end: Yup.date().nullable(),
  type: Yup.string().required('Visit type is required'),
  status: Yup.string().required('Status is required'),
  description: Yup.string()
    .min(5, 'Description too short')
    .required('Description is required'),
});

const EditVisit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [sites, setSites] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  // 📦 Cargar clientes y visita
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🧭 Cargar datos base
        const { data: clientList } = await supabase
          .from('clients')
          .select('id, name')
          .order('name', { ascending: true });
        setClients(clientList || []);

        // 🧭 Cargar visita
        const { data: visit, error } = await supabase
          .from('visits')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        if (!visit) throw new Error('Visit not found');

        // 🔄 Cargar sites y facilities dinámicamente
        const { data: siteList } = await supabase
          .from('sites')
          .select('id, name')
          .eq('client_id', visit.client_id)
          .order('name', { ascending: true });
        setSites(siteList || []);

        const { data: facilityList } = await supabase
          .from('facilities')
          .select('id, name')
          .eq('site_id', visit.site_id)
          .order('name', { ascending: true });
        setFacilities(facilityList || []);

        // 🧩 Set inicial
        setInitialValues({
          client_id: visit.client_id,
          site_id: visit.site_id,
          facility_id: visit.facility_id || '',
          date: visit.date ? new Date(visit.date) : new Date(),
          scheduled_start: visit.scheduled_start
            ? new Date(visit.scheduled_start)
            : null,
          scheduled_end: visit.scheduled_end
            ? new Date(visit.scheduled_end)
            : null,
          type: visit.type,
          status: visit.status,
          description: visit.description || '',
        });
      } catch (err) {
        toast.error(`Error loading visit: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 🔄 Manejo cascada
  const handleClientChange = async (clientId, setFieldValue) => {
    setFieldValue('site_id', '');
    setFieldValue('facility_id', '');
    setFacilities([]);
    try {
      const { data } = await supabase
        .from('sites')
        .select('id, name')
        .eq('client_id', clientId)
        .order('name', { ascending: true });
      setSites(data || []);
    } catch {
      toast.error('Error loading sites');
    }
  };

  const handleSiteChange = async (siteId, setFieldValue) => {
    setFieldValue('facility_id', '');
    try {
      const { data } = await supabase
        .from('facilities')
        .select('id, name')
        .eq('site_id', siteId)
        .order('name', { ascending: true });
      setFacilities(data || []);
    } catch {
      toast.error('Error loading facilities');
    }
  };

  // 💾 Guardar cambios
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        ...values,
        client_id: parseInt(values.client_id, 10),
        site_id: parseInt(values.site_id, 10),
        facility_id: values.facility_id
          ? parseInt(values.facility_id, 10)
          : null,
        date: values.date,
        scheduled_start: values.scheduled_start || null,
        scheduled_end: values.scheduled_end || null,
        description: values.description.trim(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('visits')
        .update(payload)
        .eq('id', id);
      if (error) throw error;

      toast.success('Visit updated successfully!');
    } catch (error) {
      toast.error(`Error updating visit: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !initialValues) {
    return <p className="m-4">Loading visit data...</p>;
  }

  return (
    <Fragment>
      <PageTitle activeMenu="Edit Visit" motherMenu="Visits" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Edit Visit</h4>
            </div>
            <div className="card-body">
              <Formik
                initialValues={initialValues}
                validationSchema={visitSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form>
                    <div className="row">
                      {/* CLIENT */}
                      <div className="col-lg-4 mb-2">
                        <label>Client</label>
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
                        <label>Site</label>
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

                      {/* DATE */}
                      <div className="col-lg-4 mb-2">
                        <label>Date</label>
                        <DatePicker
                          className="form-control"
                          selected={values.date}
                          onChange={(date) => setFieldValue('date', date)}
                          showTimeInput
                          timeInputLabel="Time:"
                          dateFormat="MM/dd/yyyy h:mm aa"
                        />
                      </div>

                      {/* SCHEDULED START */}
                      <div className="col-lg-4 mb-2">
                        <label>Scheduled Start</label>
                        <DatePicker
                          className="form-control"
                          selected={values.scheduled_start}
                          onChange={(date) =>
                            setFieldValue('scheduled_start', date)
                          }
                          showTimeInput
                          timeInputLabel="Time:"
                          dateFormat="MM/dd/yyyy h:mm aa"
                        />
                      </div>

                      {/* SCHEDULED END */}
                      <div className="col-lg-4 mb-2">
                        <label>Scheduled End</label>
                        <DatePicker
                          className="form-control"
                          selected={values.scheduled_end}
                          onChange={(date) =>
                            setFieldValue('scheduled_end', date)
                          }
                          showTimeInput
                          timeInputLabel="Time:"
                          dateFormat="MM/dd/yyyy h:mm aa"
                        />
                      </div>

                      {/* TYPE */}
                      <div className="col-lg-4 mb-2">
                        <label>Type</label>
                        <Field as="select" name="type" className="form-control">
                          <option value="corrective">Corrective</option>
                          <option value="preventive">Preventive</option>
                          <option value="installation">Installation</option>
                        </Field>
                      </div>

                      {/* STATUS */}
                      <div className="col-lg-4 mb-2">
                        <label>Status</label>
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
                      </div>

                      {/* DESCRIPTION */}
                      <div className="col-lg-12 mb-3">
                        <label>Description</label>
                        <Field
                          as="textarea"
                          name="description"
                          className="form-control"
                          rows="3"
                          placeholder="Describe visit details..."
                        />
                      </div>

                      {/* SUBMIT */}
                      <div className="col-lg-12">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Saving...' : 'Update Visit'}
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
      <div className="row">
        <div className="col-lg-12">
          <VisitTechniciansCard visitId={id} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <VisitDevicesCard visitId={id} />
        </div>
      </div>
    </Fragment>
  );
};

export default EditVisit;
