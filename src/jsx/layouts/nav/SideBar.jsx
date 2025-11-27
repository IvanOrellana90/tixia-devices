import React, { useContext, useEffect, useReducer, useState, useMemo } from 'react';
import { Modal, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { ThemeContext } from '../../../context/ThemeContext';
import HRTrimmed from '../../components/common/HRTrimmed';
import { useAuth } from '../../../context/AuthContext';

import { MenuList } from './Menu';

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: '',
  activeSubmenu: '',
};

const SideBar = () => {
  let year = new Date().getFullYear();
  const [state, setState] = useReducer(reducer, initialState);
  const { iconHover, ChangeIconSidebar } = useContext(ThemeContext);
  const { role } = useAuth();

  // For scroll
  const [hideOnScroll, setHideOnScroll] = useState(true);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );

  /// Open menu
  const handleMenuActive = (status) => {
    setState({ active: status });
    if (state.active === status) {
      setState({ active: '' });
    }
  };
  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status });
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: '' });
    }
  };

  /// Path
  let path = window.location.pathname;
  path = path.split('/');
  path = path[path.length - 1];

  useEffect(() => {
    MenuList.forEach((data) => {
      data.content?.forEach((item) => {
        if (path === item.to) {
          setState({ active: data.title });
        }
        item.content?.forEach((ele) => {
          if (path === ele.to) {
            setState({ activeSubmenu: item.title, active: data.title });
          }
        });
      });
    });
  }, [path]);

  const filteredMenuList = useMemo(() => {
    // Si no hay rol cargado aún, podrías retornar vacío o la lista completa según prefieras
    if (!role) return []; 

    return MenuList.reduce((acc, item) => {
      // A. Manejar Divisores
      if (item.type === 'divider') {
        acc.push(item);
        return acc;
      }

      // B. Verificar permiso del padre (Item principal)
      // Si el item tiene roles definidos y el usuario NO tiene ese rol, lo saltamos.
      if (item.roles && !item.roles.includes(role)) {
        return acc;
      }

      // C. Verificar hijos (Submenús)
      if (item.content) {
        // Filtramos los hijos que el usuario puede ver
        const visibleChildren = item.content.filter(child => {
          if (!child.roles) return true; // Si no tiene roles, es público
          return child.roles.includes(role);
        });

        // Solo agregamos el padre si tiene hijos visibles
        // (O si el padre NO tenía hijos originalmente pero era un link directo)
        if (visibleChildren.length > 0) {
          // Creamos una copia del item con los hijos filtrados
          acc.push({ ...item, content: visibleChildren });
        }
      } else {
        // D. Si no tiene hijos (es un link directo) y pasó el filtro B, lo agregamos
        acc.push(item);
      }

      return acc;
    }, []);
  }, [role]);

  return (
    <div
      onMouseEnter={() => ChangeIconSidebar(true)}
      onMouseLeave={() => ChangeIconSidebar(false)}
      className={`deznav ${iconHover}`}
    >
      <div className="deznav-scroll">
        <ul className="metismenu" id="menu">
          {filteredMenuList.map((data, index) => {
            let menuClass = data.classsChange;
            if (data.type === 'divider') {
              return <HRTrimmed key={index} />;
            }
            if (menuClass === 'menu-title') {
              return (
                <li className={menuClass} key={index}>
                  {data.title}
                </li>
              );
            } else {
              return (
                <li
                  className={` ${state.active === data.title ? 'mm-active' : ''} ${data.to === path ? 'mm-active' : ''}`}
                  key={index}
                >
                  {data.content && data.content.length > 0 ? (
                    <>
                      <Link
                        to={'#'}
                        className="has-arrow"
                        onClick={() => {
                          handleMenuActive(data.title);
                        }}
                      >
                        {data.iconStyle}{' '}
                        <span className="nav-text">{data.title}</span>
                      </Link>

                      <Collapse in={state.active === data.title ? true : false}>
                        <ul
                          className={`${menuClass === 'mm-collapse' ? 'mm-show' : ''}`}
                        >
                          {data.content &&
                            data.content.map((data, index) => {
                              return (
                                <li
                                  key={index}
                                  className={`${state.activeSubmenu === data.title ? 'mm-active' : ''} ${data.to === path ? 'mm-active' : ''}`}
                                >
                                  {data.content && data.content.length > 0 ? (
                                    <>
                                      <Link
                                        to={data.to}
                                        className={
                                          data.hasMenu ? 'has-arrow' : ''
                                        }
                                        onClick={() => {
                                          handleSubmenuActive(data.title);
                                        }}
                                      >
                                        {data.title}
                                      </Link>
                                      <Collapse
                                        in={
                                          state.activeSubmenu === data.title
                                            ? true
                                            : false
                                        }
                                      >
                                        <ul
                                          className={`${menuClass === 'mm-collapse' ? 'mm-show' : ''}`}
                                        >
                                          {data.content &&
                                            data.content.map((data, index) => {
                                              return (
                                                <li key={index}>
                                                  <Link
                                                    className={`${path === data.to ? 'mm-active' : ''}`}
                                                    to={data.to}
                                                  >
                                                    {data.title}
                                                  </Link>
                                                </li>
                                              );
                                            })}
                                        </ul>
                                      </Collapse>
                                    </>
                                  ) : (
                                    <Link
                                      to={data.to}
                                      className={`${data.to === path ? 'mm-active' : ''}`}
                                    >
                                      {data.title}
                                    </Link>
                                  )}
                                </li>
                              );
                            })}
                        </ul>
                      </Collapse>
                    </>
                  ) : (
                    <Link
                      to={data.to}
                      className={`${data.to === path ? 'mm-active' : ''}`}
                    >
                      {data.iconStyle}
                      <span className="nav-text">{data.title}</span>
                    </Link>
                  )}
                </li>
              );
            }
          })}
        </ul>

        <div className="copyright">
          <p>Ksec © {year} All Rights Reserved</p>
          <p className="op5">
            <span
              className="heart"
              onClick={(e) => e.target.classList.toggle('heart-blast')}
            ></span>{' '}
            by Hardware Team
          </p>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
