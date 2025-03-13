import { Fragment, useReducer } from 'react';
import PageTitle from '../../layouts/PageTitle';
import { Modal } from 'react-bootstrap';
import { FlatIconData } from '../../content/AllData';

export default function FlaticonIcons() {
  const initialState = false;
  const reducer = (state, action) => {
    switch (action.type) {
      case 'icon':
        return { ...state, icon: !state.icon, content: action.content };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Fragment>
      <PageTitle motherMenu={'Icons'} activeMenu={'Flaticon Icons'} />
      <div className="card">
        <div className="card-body svg-area pb-1">
          <div className="row">
            {FlatIconData.map((elem, ind) => (
              <div
                className="col-xl-2 col-lg-3 col-xxl-2 col-md-4 col-sm-6 col-12 m-b30"
                key={ind}
              >
                <div className="svg-icons-ov style-1">
                  <div
                    className="svg-icons-prev"
                    onClick={() =>
                      dispatch({ type: 'icon', content: elem.title })
                    }
                  >
                    <i className={elem.svgtype} />
                  </div>
                  <div className="svg-classname">{elem.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        centered
        show={state.icon}
        onHide={() => dispatch({ type: 'icon' })}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{state.content}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => dispatch({ type: 'icon' })}
            ></button>
          </div>
          <div className="modal-body">
            <pre>&lt;i className={state.content} /&gt;</pre>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => dispatch({ type: 'icon' })}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}
