import { Fragment, useReducer } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../layouts/PageTitle';
import { Modal } from 'react-bootstrap';
import { SVGICON } from '../../content/theme';

const SvgiconData = [
  {
    Iconname: 'bell.svg',
    svgtype: SVGICON.Bell,
  },
  {
    Iconname: 'message.svg',
    svgtype: SVGICON.Message,
  },
  {
    Iconname: 'logout.svg',
    svgtype: SVGICON.logout,
  },
  {
    Iconname: 'mail.svg',
    svgtype: SVGICON.Mail,
  },
  {
    Iconname: 'user.svg',
    svgtype: SVGICON.User,
  },
  {
    Iconname: 'trending.svg',
    svgtype: SVGICON.Trending,
  },
  {
    Iconname: 'calender.svg',
    svgtype: SVGICON.Calender,
  },
  {
    Iconname: 'dollar.svg',
    svgtype: SVGICON.Doller,
  },
  {
    Iconname: 'location.svg',
    svgtype: SVGICON.Locaton,
  },
  {
    Iconname: 'analysis.svg',
    svgtype: SVGICON.Analysis,
  },
  {
    Iconname: 'add.svg',
    svgtype: SVGICON.AddSvg,
  },
  {
    Iconname: 'video.svg',
    svgtype: SVGICON.VideoSvg,
  },
  {
    Iconname: 'send.svg',
    svgtype: SVGICON.SendSvg,
  },
  {
    Iconname: 'menu.svg',
    svgtype: SVGICON.MenuSvg,
  },
];

export default function SvgIcons() {
  const initialState = false;
  const reducer = (state, action) => {
    switch (action.type) {
      case 'imageModal':
        return {
          ...state,
          imageModal: !state.imageModal,
          content: action.content,
        };
      case 'svgModal':
        return {
          ...state,
          svgModal: !state.svgModal,
          content: action.content,
          title: action.title,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Fragment>
      <PageTitle motherMenu={'Icons'} activeMenu={'Svg Icons'} />
      <div class="card">
        <div class="card-body svg-area">
          <div class="row gx-xl-3">
            {SvgiconData.map((item, index) => (
              <div
                class="col-xl-2 col-lg-4 col-xxl-2 col-md-6 col-sm-6 col-12 m-b20"
                key={index}
              >
                <div class="svg-icons-ov">
                  <div class="svg-icons-prev">
                    <div dangerouslySetInnerHTML={{ __html: item.svgtype }} />
                    {/* {item.svgtype} */}
                  </div>
                  <div class="svg-classname">{item.Iconname}</div>
                  <div class="svg-icon-popup">
                    <Link
                      to={'#'}
                      onClick={() =>
                        dispatch({ type: 'imageModal', content: item.Iconname })
                      }
                      class="btn btn-sm btn-brand"
                    >
                      <i class="fa-solid fa-image" />
                    </Link>
                    <Link
                      to={'#'}
                      onClick={() =>
                        dispatch({
                          type: 'svgModal',
                          content: item.Iconname,
                          title: item.svgtype,
                        })
                      }
                      class="btn btn-sm btn-brand"
                    >
                      <i class="fa fa-code" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        className="modal fade"
        show={state.imageModal}
        onHide={() => dispatch({ type: 'imageModal' })}
        centered
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="svg_img_label_Brassieresvg">
              {state.content}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => dispatch({ type: 'imageModal' })}
            ></button>
          </div>
          <div className="modal-body">
            <pre>
              {`import IconName from "../assets/images/iconly/bulk/${state.content}";
    export default function Imageblog() {   
    return  
        <div>
        <img src={IconName} alt="Example" />   
        </div>
    }`}
              ;
            </pre>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => dispatch({ type: 'imageModal' })}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        className="modal fade"
        show={state.svgModal}
        onHide={() => dispatch({ type: 'svgModal' })}
        centered
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="svg_inline_label_Brassieresvg">
              {state.content}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => dispatch({ type: 'svgModal' })}
            ></button>
          </div>
          <div className="modal-body">
            <pre>{state.title}</pre>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => dispatch({ type: 'svgModal' })}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}
