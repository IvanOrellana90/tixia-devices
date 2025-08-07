import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const configFields = [
  {
    key: 'debug_mode',
    label: 'Debug Mode',
    type: 'select',
    options: ['True', 'False'],
    initial: 'False',
  },
  {
    key: 'orientation_mode',
    label: 'Orientation Mode',
    type: 'select',
    options: ['default', 'horizontal', 'vertical'],
    initial: 'default',
  },
  {
    key: 'config_mode',
    label: 'Config Mode',
    type: 'select',
    options: ['entry', 'exit'],
    initial: 'entry',
  },
  { key: 'camera_zoom', label: 'Camera Zoom', type: 'number', initial: '0' },
  {
    key: 'movement_sensibility',
    label: 'Movement Sensibility',
    type: 'number',
    initial: '80',
  },
  {
    key: 'manual_entry_password',
    label: 'Manual Entry Password',
    type: 'number',
    initial: '438082',
  },
  {
    key: 'exit_confirmation',
    label: 'Exit Confirmation',
    type: 'select',
    options: ['True', 'False'],
    initial: 'False',
  },
  {
    key: 'manual_entry',
    label: 'Manual Entry',
    type: 'select',
    options: ['True', 'False'],
    initial: 'True',
  },
  {
    key: 'time_standby_screen',
    label: 'Time Standby Screen',
    type: 'number',
    initial: '0',
  },
  {
    key: 'enable_flash',
    label: 'Enable Flash',
    type: 'select',
    options: ['True', 'False'],
    initial: 'False',
  },
  {
    key: 'enable_chip_validation',
    label: 'Enable Chip Validation',
    type: 'select',
    options: ['True', 'False'],
    initial: 'False',
  },
  {
    key: 'enable_vehicle_flow',
    label: 'Enable Vehicle Flow',
    type: 'select',
    options: ['True', 'False'],
    initial: 'False',
  },
  {
    key: 'enable_carrier_flow',
    label: 'Enable Carrier Flow',
    type: 'select',
    options: ['True', 'False'],
    initial: 'False',
  },
  {
    key: 'raspberry_photo',
    label: 'Raspberry Photo',
    type: 'select',
    options: ['True', 'False'],
    initial: 'False',
  },
  {
    key: 'access_fast_upload',
    label: 'Access Fast Upload',
    type: 'select',
    options: ['True', 'False'],
    initial: 'False',
  },
  {
    key: 'full_sync_hour',
    label: 'Full Sync Hour',
    type: 'number',
    initial: '2',
  },
  { key: 'shift_rule', label: 'Shift Rule', type: 'number', initial: '0' },
  {
    key: 'double_shift_rule',
    label: 'Double Shift Rule',
    type: 'number',
    initial: '0',
  },
];

const configSchema = Yup.object(
  configFields.reduce((acc, field) => {
    acc[field.key] =
      field.type === 'number'
        ? Yup.number().typeError('Must be a number')
        : Yup.string();
    return acc;
  }, {})
);

const DeviceConfigurationForm = ({ deviceId }) => {
  const [initialConfig, setInitialConfig] = useState(
    configFields.reduce(
      (acc, field) => ({ ...acc, [field.key]: field.initial }),
      {}
    )
  );
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [isSendingPush, setIsSendingPush] = useState(false);
  const [pushTokenInfo, setPushTokenInfo] = useState(null);
  const [loadingPushToken, setLoadingPushToken] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!deviceId) return;

    const loadConfig = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('device_configurations')
        .select('configuration')
        .eq('device_id', deviceId)
        .single();

      if (error && error.code !== 'PGRST116') {
        toast.error(error.message);
      }
      if (data?.configuration) {
        setInitialConfig((prev) => ({ ...prev, ...data.configuration }));
      }
      setLoading(false);
    };

    const loadPushToken = async () => {
      setLoadingPushToken(true);
      const { data, error } = await supabase
        .from('device_push_tokens')
        .select('*')
        .eq('device_id', deviceId)
        .single();

      if (error && error.code !== 'PGRST116') {
        toast.error(error.message);
      }
      setPushTokenInfo(data || null);
      setLoadingPushToken(false);
    };

    loadConfig();
    loadPushToken();
  }, [deviceId]);

  const renderPushTokenStatus = () => {
    if (loadingPushToken) {
      return (
        <div className="alert alert-info" role="alert">
          Loading push token status...
        </div>
      );
    }

    if (!pushTokenInfo) {
      return (
        <div className="alert alert-warning" role="alert">
          <FontAwesomeIcon icon={faThumbsDown} className="me-2" />
          <strong>Token not registered</strong>
          <div className="small mt-1">Device has no push token</div>
        </div>
      );
    }

    return (
      <div className="alert alert-info" role="alert">
        <FontAwesomeIcon icon={faThumbsUp} className="me-2" />
        <strong>Active token</strong>
        <div className="small">
          Last push:{' '}
          {pushTokenInfo.last_pushed_at
            ? moment(pushTokenInfo.last_pushed_at).format('DD/MM/YYYY HH:mm')
            : 'No information'}
        </div>
      </div>
    );
  };

  const handleSendPush = async () => {
    setIsSendingPush(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/.netlify/functions/sendPushToDevice`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            device_id: deviceId,
            title: 'Update available!',
            body: 'New configuration available',
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send push');
      }

      toast.success('Push sent successfully');

      // Update local state if needed
      if (pushTokenInfo) {
        setPushTokenInfo((prev) => ({
          ...prev,
          last_pushed_at: new Date().toISOString(),
          last_push_status: 'success',
        }));
      }

      return result;
    } catch (error) {
      console.error('Push error:', error);
      toast.error(error.message || 'Failed to send push');
      throw error;
    } finally {
      setIsSendingPush(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { error } = await supabase.from('device_configurations').upsert(
        [
          {
            device_id: deviceId,
            configuration: values,
            updated_at: new Date().toISOString(),
          },
        ],
        { onConflict: 'device_id' }
      );

      if (error) throw error;
      toast.success('Configuration saved');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div
        className="card-header d-flex justify-content-between align-items-center"
        style={{
          cursor: 'pointer',
          background: collapsed ? '#fff' : '#e8ecef',
          transition: 'background 0.2s',
        }}
        onClick={() => setCollapsed((prev) => !prev)}
      >
        <div className="row w-100 align-items-center gx-0">
          <div className="col-12 col-md-10">
            <h4 className="card-title mb-0">Device Configuration</h4>
          </div>
          <div className="col-12 col-md-2 text-xl-center mt-2">
            {renderPushTokenStatus()}
          </div>
        </div>
      </div>

      <div className={`card-body collapse ${collapsed ? '' : 'show'}`}>
        {loading ? (
          <div>Loading configuration...</div>
        ) : (
          <Formik
            initialValues={initialConfig}
            enableReinitialize
            validationSchema={configSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, resetForm }) => (
              <Form>
                <div className="row">
                  {configFields.map((field) => (
                    <div className="col-lg-6 mb-2" key={field.key}>
                      <div className="form-group mb-3">
                        <label className="text-label">{field.label}</label>
                        {field.type === 'select' ? (
                          <Field
                            as="select"
                            name={field.key}
                            className="form-control"
                            disabled={!isEditing}
                          >
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </Field>
                        ) : (
                          <Field
                            type={field.type}
                            name={field.key}
                            className="form-control"
                            disabled={!isEditing}
                          />
                        )}
                        <ErrorMessage
                          name={field.key}
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="col-lg-12">
                    {!isEditing ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Configuration
                      </button>
                    ) : (
                      <>
                        <button
                          type="submit"
                          className="btn btn-sm btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger ms-2"
                          onClick={() => {
                            setIsEditing(false);
                            resetForm();
                          }}
                          disabled={isSubmitting}
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    <button
                      className="btn btn-sm btn-outline-primary ms-2"
                      onClick={handleSendPush}
                      disabled={isSendingPush}
                      type="button"
                    >
                      {isSendingPush ? (
                        <span className="spinner-border spinner-border-sm me-2" />
                      ) : (
                        <i className="fa fa-bell me-2" />
                      )}
                      Send Push
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default DeviceConfigurationForm;
