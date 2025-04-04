import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Modal, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { ThemeContext } from '../../../context/ThemeContext';

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

  return (
    <div
      onMouseEnter={() => ChangeIconSidebar(true)}
      onMouseLeave={() => ChangeIconSidebar(false)}
      className={`deznav ${iconHover}`}
    >
      <div className="deznav-scroll">
        <ul className="metismenu" id="menu">
          {MenuList.map((data, index) => {
            let menuClass = data.classsChange;
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
          <p>
            Ksec © {year} All Rights Reserved
          </p>
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
