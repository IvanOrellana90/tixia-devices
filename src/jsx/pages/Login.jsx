import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IMAGES } from '../content/theme';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { supabase } from '../supabase/client';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Debe ser un correo electrónico válido')
    .required('El correo electrónico es obligatorio')
    .test(
      'domain-check',
      'Solo se permiten correos @interkambio.cl',
      (value) => {
        return value?.endsWith('@interkambio.cl');
      }
    ),
});

const Login = () => {
  const [error, setError] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    // Comprobar si el usuario ya tiene una sesión activa
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        sessionStorage.setItem('user', JSON.stringify(data.session.user));
        nav('/');
      }
    };
    checkSession();
  }, [nav]);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: async ({ email }) => {
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          // options: { emailRedirectTo: 'https://ksec-devices.netlify.app/' },
          options: { emailRedirectTo: 'http://localhost:5173/' },
        });

        if (error) throw error;

        // Mostrar toast de éxito
        toast.success('¡Revisa tu correo para el enlace de ingreso!', {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } catch (error) {
        setError(error.message);

        // Mostrar toast de error
        toast.error(`Error: ${error.message}`, {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    },
  });

  return (
    <div className="fix-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6">
            <div className="card mb-0 h-auto">
              <div className="card-body">
                <div className="text-center mb-3">
                  <Link to={'/'}>
                    <img
                      className="logo-auth"
                      src={IMAGES.logofull}
                      alt="logo"
                    />
                  </Link>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group mb-4">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                      placeholder="hello@interkambio.cl"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
