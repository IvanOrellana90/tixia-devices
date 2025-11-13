import { Fragment, useEffect, useState, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../layouts/PageTitle';

const deviceSchema = Yup.object().shape({
  mobile_id: Yup.string().required('Mobile (IMEI) is required'),
  client_id: Yup.string().required('Client ID is required'),
  site_ksec_id: Yup.string().required('Site KSEC ID is required'),
  location: Yup.string().min(3).max(100).required('Location is required'),
  mode: Yup.string()
    .oneOf(['Tourniquet', 'Kiosk', 'PDA'])
    .required('Mode is required'),
  unique_id: Yup.string()
    .trim()
    .max(128, 'Max 128 characters')
    .required('Unique ID is required'),
});

const AddDevice = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [sites, setSites] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [mobiles, setMobiles] = useState([]);

  const [imeiSearch, setImeiSearch] = useState('');
  const [isListVisible, setIsListVisible] = useState(false);

  const filteredMobiles = useMemo(() => {
    const searchTerm = imeiSearch.toLowerCase();
    if (!searchTerm) {
      return [];
    }

    return mobiles.filter(
      (m) =>
        m.imei.toLowerCase().includes(searchTerm) ||
        (m.model && m.model.toLowerCase().includes(searchTerm))
    );
  }, [imeiSearch, mobiles]);

  useEffect(() => {
    (async () => {
      const { data: cData, error: cErr } = await supabase
        .from('clients')
        .select('id, name, url');
      if (cErr) toast.error(`Error fetching clients: ${cErr.message}`);
      else setClients(cData || []);

      const { data: mData, error: mErr } = await supabase
        .from('mobiles')
        .select('id, imei, model')
        .neq('imei', '')
        .order('imei', { ascending: true });
      if (mErr) toast.error(`Error fetching mobiles: ${mErr.message}`);
      else setMobiles(mData || []);
    })();
  }, []);

  const fetchSites = async (clientId) => {
    if (!clientId) {
      setSites([]);
      setFacilities([]);
      return;
    }
    const { data, error } = await supabase
      .from('sites')
      .select('id, name, ksec_id, client_id')
      .eq('client_id', clientId);
    if (error) toast.error(`Error fetching sites: ${error.message}`);
    else {
      setSites(data || []);
      setFacilities([]);
    }
  };

  const fetchFacilities = async (siteId) => {
    if (!siteId) return setFacilities([]);
    const { data, error } = await supabase
      .from('facilities')
      .select('id, name, ksec_id, site_id')
      .eq('site_id', siteId);
    if (error) toast.error(`Error fetching facilities: ${error.message}`);
    else setFacilities(data || []);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const selectedSite = sites.find(
        (s) => s.ksec_id === parseInt(values.site_ksec_id, 10)
      );
      if (!selectedSite)
        throw new Error(
          'Selected site not found or does not belong to the selected client'
        );

      let selectedFacility = null;
      if (values.facility_ksec_id) {
        selectedFacility = facilities.find(
          (f) => f.ksec_id === parseInt(values.facility_ksec_id, 10)
        );
        if (!selectedFacility)
          throw new Error(
            'Selected facility not found or does not belong to the selected site'
          );
      }

      const deviceData = {
        mobile_id: values.mobile_id ? parseInt(values.mobile_id, 10) : null,
        client_id: parseInt(values.client_id, 10),
        site_id: selectedSite.id,
        site_ksec_id: values.site_ksec_id,
        facility_id: selectedFacility?.id || null,
        facility_ksec_id: selectedFacility?.ksec_id || null,
        location: values.location.trim(),
        mode: values.mode,
        unique_id: values.unique_id?.trim() || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('devices').insert([deviceData]);
      if (error) throw error;

      toast.success('Device created successfully!');
      resetForm();
      navigate('/devices');
    } catch (e) {
      toast.error(e.message || 'Error creating device');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Add Device" motherMenu="Device" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Device</h4>
            </div>
            <div className="card-body">
              <Formik
                initialValues={{
                  mobile_id: '',
                  client_id: '',
                  site_ksec_id: '',
                  facility_ksec_id: '',
                  location: '',
                  mode: '',
                  unique_id: '',
                }}
                validationSchema={deviceSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form>
                    <div className="row">
                      {/* Mobile IMEI */}
                      <div className="col-lg-6 mb-2">
                        <div
                          className="form-group mb-3"
                          style={{ position: 'relative' }}
                        >
                          <label className="text-label">
                            Mobile (IMEI) <span className="required">*</span>
                          </label>

                          {/* Input de Búsqueda */}
                          <input
                            type="text"
                            className="form-control"
                            value={imeiSearch}
                            onChange={(e) => {
                              setImeiSearch(e.target.value);
                              setIsListVisible(true);
                              if (values.mobile_id) {
                                setFieldValue('mobile_id', '');
                              }
                            }}
                            onFocus={() => setIsListVisible(true)}
                            onBlur={() => {
                              setTimeout(() => setIsListVisible(false), 200);
                            }}
                            placeholder="Search IMEI or Model"
                          />

                          {/* Lista de Resultados Filtrados */}
                          {isListVisible && filteredMobiles.length > 0 && (
                            <div className="list-group imei-search-list">
                              {filteredMobiles.map((m) => (
                                <button
                                  type="button"
                                  key={m.id}
                                  className="list-group-item list-group-item-action"
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    setFieldValue('mobile_id', m.id.toString());
                                    setImeiSearch(
                                      `${m.imei}${m.model ? ` [${m.model}]` : ''}`
                                    );
                                    setIsListVisible(false);
                                  }}
                                >
                                  {m.imei}
                                  {m.model ? ` [${m.model}]` : ''}
                                </button>
                              ))}
                            </div>
                          )}

                          <ErrorMessage
                            name="mobile_id"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      {/* Client */}
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
                              setFieldValue('site_ksec_id', '');
                              setFieldValue('facility_ksec_id', '');
                              fetchSites(e.target.value);
                            }}
                          >
                            <option value="">Select a Client</option>
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
                      </div>

                      {/* Site */}
                      <div className="col-lg-6 mb-2">
                        <div className="form-group mb-3">
                          <label className="text-label">
                            Site KSEC ID <span className="required">*</span>
                          </label>
                          <Field
                            as="select"
                            name="site_ksec_id"
                            className="form-control"
                            disabled={!values.client_id}
                            onChange={(e) => {
                              setFieldValue('site_ksec_id', e.target.value);
                              setFieldValue('facility_ksec_id', '');
                              const site = sites.find(
                                (s) => String(s.ksec_id) === e.target.value
                              );
                              fetchFacilities(site?.id || null);
                            }}
                          >
                            <option value="">Select a Site</option>
                            {sites.map((s) => (
                              <option key={s.id} value={s.ksec_id}>
                                {s.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="site_ksec_id"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      {/* Facility */}
                      <div className="col-lg-6 mb-2">
                        <div className="form-group mb-3">
                          <label className="text-label">Facility KSEC ID</label>
                          <Field
                            as="select"
                            name="facility_ksec_id"
                            className="form-control"
                            disabled={!values.site_ksec_id}
                          >
                            <option value="">Select a Facility</option>
                            {facilities.map((f) => (
                              <option key={f.id} value={f.ksec_id}>
                                {f.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="facility_ksec_id"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div className="col-lg-6 mb-2">
                        <div className="form-group mb-3">
                          <label className="text-label">
                            Location <span className="required">*</span>
                          </label>
                          <Field
                            type="text"
                            name="location"
                            className="form-control"
                            placeholder="Device Location"
                          />
                          <ErrorMessage
                            name="location"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      {/* Mode */}
                      <div className="col-lg-6 mb-2">
                        <div className="form-group mb-3">
                          <label className="text-label">
                            Mode <span className="required">*</span>
                          </label>
                          <Field
                            as="select"
                            name="mode"
                            className="form-control"
                          >
                            <option value="">Select Mode</option>
                            <option value="Tourniquet">Tourniquet</option>
                            <option value="Kiosk">Kiosk</option>
                            <option value="PDA">PDA</option>
                          </Field>
                          <ErrorMessage
                            name="mode"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      {/* Unique ID (nuevo) */}
                      <div className="col-lg-6 mb-2">
                        <div className="form-group mb-3">
                          <label className="text-label">
                            Unique ID (Android ID / Device ID)
                          </label>
                          <Field
                            type="text"
                            name="unique_id"
                            className="form-control"
                            placeholder="a1b2c3d4e5f6g7h8"
                          />
                          <ErrorMessage
                            name="unique_id"
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
                          {isSubmitting ? 'Saving...' : 'Save Device'}
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

export default AddDevice;
