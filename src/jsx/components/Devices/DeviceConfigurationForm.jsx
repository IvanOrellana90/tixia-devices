import { Fragment, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';

// Lista de parámetros y su configuración inicial y tipo de campo
const configFields = [
  {
    key: 'debug_mode',
    label: 'Debug Mode',
    type: 'select',
    options: ['True', 'False'],
    initial: 'False',
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

// Validación Yup (puedes expandirlo si quieres validaciones más estrictas)
const configSchema = Yup.object(
  configFields.reduce((acc, field) => {
    if (field.type === 'number') {
      acc[field.key] = Yup.number().typeError('Must be a number');
    } else {
      acc[field.key] = Yup.string();
    }
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

  // Carga config actual (si existe)
  useEffect(() => {
    if (!deviceId) return;
    setLoading(true);
    supabase
      .from('device_configurations')
      .select('configuration')
      .eq('device_id', deviceId)
      .single()
      .then(({ data, error }) => {
        if (error && error.code !== 'PGRST116') {
          toast.error(error.message);
        }
        // Si no hay data, simplemente no hagas nada (usarás el estado por defecto)
        if (data && data.configuration) {
          setInitialConfig((prev) => ({ ...prev, ...data.configuration }));
        }
      })
      .finally(() => setLoading(false));
  }, [deviceId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const { error } = await supabase
      .from('device_configurations')
      .upsert(
        [
          {
            device_id: deviceId,
            configuration: values,
            updated_at: new Date().toISOString(),
          },
        ],
        { onConflict: 'device_id' }
      );
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Configuración guardada');
    }
    setSubmitting(false);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Device Configuration</h4>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => setCollapsed((prev) => !prev)}
              >
                {collapsed ? 'Expand' : 'Collapse'}
              </button>
            </div>
            <div
              className={`card-body collapse ${collapsed ? '' : 'show'}`}
              style={{
                display: collapsed ? 'none' : 'block',
                transition: 'all 0.3s',
              }}
            >
              {loading ? (
                <div>Cargando configuración...</div>
              ) : (
                <div className="form-validation">
                  <Formik
                    initialValues={initialConfig}
                    enableReinitialize
                    validationSchema={configSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="row">
                          {configFields.map((field, idx) => (
                            <div className="col-lg-6 mb-2" key={field.key}>
                              <div className="form-group mb-3">
                                <label className="text-label">
                                  {field.label}
                                </label>
                                {field.type === 'select' ? (
                                  <Field
                                    as="select"
                                    name={field.key}
                                    className="form-control"
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
                                    placeholder={field.label}
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
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={isSubmitting}
                            >
                              {isSubmitting
                                ? 'Saving...'
                                : 'Save Configuration'}
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DeviceConfigurationForm;
