import { Fragment, useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import { Dropdown, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// function OffcanvasDirection({ name, prop}){
//     const [directionOffcanvas, setDirectionOffcanvas] = useState(false);
//     function handleOpen(){
//         setDirectionOffcanvas(true);
//     }
//     function handleClose(){
//         setDirectionOffcanvas(false);
//     }
//     return(
//         <Fragment>
//             <button className="btn btn-primary me-2 mb-2" type="button" onClick={handleOpen}>{name}</button>
//             <Offcanvas className="offcanvas-top" show={directionOffcanvas} onHide={handleClose} {...prop}>
//                 <div className="offcanvas-header">
//                     <h5 className="offcanvas-title" id="offcanvasTopLabel">Offcanvas</h5>
//                     <button type="button" className="btn-close" onClick={handleClose}></button>
//                 </div>
//                 <div className="offcanvas-body">
//                     Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
//                     Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
//                 </div>
//             </Offcanvas>
//         </Fragment>
//     )
// }

function OffCanvasDirection({ name, ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-primary me-2 mb-2" onClick={handleShow}>
        Toggle {name} offcanvas
      </button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default function OffcanvasBlog() {
  const [demoOffcanvas, setDemoOffcanvas] = useState(false);
  const [scrollingOffcanvas, setScrollingOffcanvas] = useState(false);
  const [scrollingBackdropOffcanvas, setScrollingBackdropOffcanvas] =
    useState(false);
  const [backdropOffcanvas, setBackdropOffcanvas] = useState(false);

  // const direction = [
  //     { title:'Offcanvas top', placement:"top"},
  //     { title:'Offcanvas right', placement:"end"},
  //     { title:'Offcanvas bottom', placement:"bottom"},
  // ];

  return (
    <Fragment>
      <PageTitle motherMenu={'Bootstrap'} activeMenu={'Offcanvas'} />
      <div className="row">
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Live Demo</h4>
            </div>
            <div className="card-body">
              <Link
                to={'#'}
                className="btn btn-primary me-2 mb-2"
                onClick={() => setDemoOffcanvas(true)}
              >
                Link with href
              </Link>
              <button
                className="btn btn-primary me-2 mb-2"
                type="button"
                onClick={() => setDemoOffcanvas(true)}
              >
                Button with data-bs-target
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Body Scrolling</h4>
            </div>
            <div className="card-body">
              <button
                className="btn btn-primary me-2 mb-2"
                type="button"
                onClick={() => setScrollingOffcanvas(true)}
              >
                Enable body scrolling
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Body scrolling and backdrop</h4>
            </div>
            <div className="card-body">
              <button
                className="btn btn-primary me-2 mb-2"
                type="button"
                onClick={() => setScrollingBackdropOffcanvas(true)}
              >
                Enable both scrolling & backdrop
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Static backdrop</h4>
            </div>
            <div className="card-body">
              <button
                className="btn btn-primary me-2 mb-2"
                type="button"
                onClick={() => setBackdropOffcanvas(true)}
              >
                Toggle static offcanvas
              </button>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Placement</h4>
            </div>
            <div className="card-body">
              {['end', 'top', 'bottom'].map((placement, idx) => (
                <OffCanvasDirection
                  key={idx}
                  placement={placement}
                  name={placement}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Offcanvas
        className="offcanvas-start"
        show={demoOffcanvas}
        onHide={setDemoOffcanvas}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Offcanvas</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setDemoOffcanvas(false)}
          ></button>
        </div>
        <div className="offcanvas-body">
          <div>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </div>
          <Dropdown className="mt-3">
            <Dropdown.Toggle
              as="div"
              className="btn btn-secondary"
              type="button"
            >
              Dropdown button
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <li>
                <Dropdown.Item>Action</Dropdown.Item>
              </li>
              <li>
                <Dropdown.Item>Another action</Dropdown.Item>
              </li>
              <li>
                <Dropdown.Item>Something else here</Dropdown.Item>
              </li>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Offcanvas>
      <Offcanvas
        className="offcanvas-start"
        show={scrollingOffcanvas}
        scroll={true}
        backdrop={false}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            Offcanvas with body scrolling
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setScrollingOffcanvas(false)}
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>
            Try scrolling the rest of the page to see this option in action.
          </p>
        </div>
      </Offcanvas>
      <Offcanvas
        className="offcanvas-start"
        show={scrollingBackdropOffcanvas}
        onHide={setScrollingBackdropOffcanvas}
        scroll={true}
        backdrop={true}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Backdrop with scrolling</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setScrollingBackdropOffcanvas(false)}
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>
            Try scrolling the rest of the page to see this option in action.
          </p>
        </div>
      </Offcanvas>
      <Offcanvas
        className="offcanvas-start"
        show={backdropOffcanvas}
        backdrop="static"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="staticBackdropLabel">
            Offcanvas
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setBackdropOffcanvas(false)}
          ></button>
        </div>
        <div className="offcanvas-body">
          <div>I will not close if you click outside of me.</div>
        </div>
      </Offcanvas>
    </Fragment>
  );
}
