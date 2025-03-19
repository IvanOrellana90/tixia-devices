import React, { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import { useNavigate } from 'react-router-dom';

/// Image
import profile from '../../../assets/images/profile/pic1.jpg';
import { ThemeContext } from '../../../context/ThemeContext';
import { toast } from 'react-toastify';

const Header = ({ onNote, toggle, onProfile, onNotification, onClick }) => {
  const { background, changeBackground } = useContext(ThemeContext);
  const [userEmail, setUserEmail] = useState(null);

  const navigate = useNavigate();

  // Obtener el email del usuario autenticado
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email); // Guardar el email del usuario
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut(); // Cierra la sesión
      if (error) {
        throw error;
      }
      toast.succes('Sesión cerrada correctamente');
      // Redirige al usuario a la página de login
      navigate('/page-login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
      toast.error('Error al cerrar sesión');
    }
  };

  function ChangeMode() {
    if (background.value === 'light') {
      changeBackground({ value: 'dark', Label: 'Dark' });
    } else {
      changeBackground({ value: 'light', Label: 'Light' });
    }
  }

  let path = window.location.pathname.split('/');
  let name = path[path.length - 1].split('-');
  let filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  let finalName = filterName.includes('app')
    ? filterName.filter((f) => f !== 'app')
    : filterName.includes('ui')
      ? filterName.filter((f) => f !== 'ui')
      : filterName.includes('uc')
        ? filterName.filter((f) => f !== 'uc')
        : filterName.includes('basic')
          ? filterName.filter((f) => f !== 'basic')
          : filterName.includes('jquery')
            ? filterName.filter((f) => f !== 'jquery')
            : filterName.includes('table')
              ? filterName.filter((f) => f !== 'table')
              : filterName.includes('page')
                ? filterName.filter((f) => f !== 'page')
                : filterName.includes('email')
                  ? filterName.filter((f) => f !== 'email')
                  : filterName.includes('ecom')
                    ? filterName.filter((f) => f !== 'ecom')
                    : filterName.includes('chart')
                      ? filterName.filter((f) => f !== 'chart')
                      : filterName.includes('editor')
                        ? filterName.filter((f) => f !== 'editor')
                        : filterName;

  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              {/* Alerta para usuario autenticado o no autenticado */}
              {userEmail ? (
                <div
                  role="alert"
                  className="fade alert alert-primary alert-dismissible show p-2"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    marginBottom: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="me-2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>{' '}
                  {userEmail}
                </div>
              ) : (
                <div
                  role="alert"
                  className="fade alert alert-secondary alert-dismissible show p-2"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    marginBottom: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="me-2"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                  Unregistered User
                </div>
              )}
            </div>
            <ul className="navbar-nav header-right">
              <li className="nav-item dropdown notification_dropdown">
                <Link
                  to={'#'}
                  className={`nav-link bell primary dz-theme-mode ${background.value === 'dark' ? 'active' : ''}`}
                  onClick={ChangeMode}
                >
                  <i id="icon-light" className="fas fa-sun" />
                  <i id="icon-dark" className="fas fa-moon" />
                </Link>
              </li>

              <Dropdown as="li" className="nav-item dropdown header-profile">
                <Dropdown.Toggle
                  className="nav-link icon-false"
                  to="#"
                  as="div"
                >
                  <img src={profile} width={20} alt="profile" />
                </Dropdown.Toggle>

                <Dropdown.Menu
                  className={`dropdown-menu dropdown-menu-right profile mt-2`}
                  align="end"
                >
                  <div
                    onClick={handleLogout}
                    className="dropdown-item ai-icon"
                    style={{ cursor: 'pointer' }}
                  >
                    <svg
                      id="icon-logout"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-danger"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1={21} y1={12} x2={9} y2={12} />
                    </svg>
                    <span className="ms-2">Logout</span>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
