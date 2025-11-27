import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IMAGES } from '../content/theme';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { supabase } from '../supabase/client';
import { toast } from 'react-toastify';
// Importamos el hook
import { useAuth } from '../../context/AuthContext';

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
  // 👇 AQUÍ ESTABA EL ERROR: Faltaba obtener user y loading del contexto
  const { user, loading } = useAuth();
  
  const [error, setError] = useState('');
  const nav = useNavigate();

  // 1. Redirigir si ya hay sesión activa (Usando datos del Contexto)
  useEffect(() => {
    if (!loading && user) {
      nav('/');
    }
  }, [user, loading, nav]);

  // ❌ ELIMINADO: El segundo useEffect que llamaba a checkSession() manual.
  // No es necesario porque el AuthContext ya maneja la sesión y el useEffect
  // de arriba ya te redirige si detecta al usuario.

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: async ({ email }) => {
      try {
        const cleanEmail = email
          .toLowerCase()
          .trim()
          .replace(/[\u200B-\u200D\uFEFF\u00A0\u2028\u2029]/g, '');

        console.log(`Enviando email: "${cleanEmail}"`);

        const { error } = await supabase.auth.signInWithOtp({
          email: cleanEmail,
          options: { emailRedirectTo: `${import.meta.env.VITE_URL}/` },
        });

        if (error) throw error;

        toast.success('¡Revisa tu correo para el enlace de ingreso!', {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } catch (error) {
        console.error('Error Supabase:', error);
        setError(error.message);
        toast.error(`Error: ${error.message}`);
      }
    },
  });

  // Si está cargando verificando sesión, mostramos spinner o nada
  if (loading) return <div>Cargando...</div>;

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