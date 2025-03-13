import { Fragment } from 'react';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { Link } from 'react-router-dom';
import { IMAGES, SVGICON } from '../../../content/theme';
import CardFooterContent from '../Profile/CardFooterContent';

function CardGalleryTwo() {
  return (
    <Fragment>
      <div className="card card-comment">
        <div className="card-body pb-0">
          <div className="d-flex justify-content-between mb-2">
            <div className="d-flex align-items-center py-2">
              <div className="d-inline-block position-relative">
                <img
                  src={IMAGES.Avatar3}
                  alt="avat"
                  className="rounded avatar avatar-md"
                />
              </div>
              <div className="clearfix ms-2">
                <h6 className="fs-14 mb-0 fw-semibold">Kennedy</h6>
                <span className="fs-13">Yestarday at 5:30 PM</span>
              </div>
            </div>
            <div className="clearfix ms-auto">
              <button
                type="button"
                className="btn btn-light btn-icon-xxs tp-btn fs-18 align-self-start"
              >
                <i className="bi bi-grid" />
              </button>
            </div>
          </div>
          <LightGallery
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
            elementClassNames="gallery-grid rows-3"
          >
            <a
              href={IMAGES.PostFull2}
              data-exthumbimage={IMAGES.PostFull2}
              data-src={IMAGES.PostFull2}
              className="grid-item colspan-2 rowspan-3"
            >
              <img src={IMAGES.PostFull2} alt="" />
            </a>
            <a
              href={IMAGES.PostImg4}
              data-exthumbimage={IMAGES.PostImg4}
              data-src={IMAGES.PostImg4}
              className="grid-item"
            >
              <img src={IMAGES.PostImg4} alt="" />
            </a>
            <a
              href={IMAGES.PostImg5}
              data-exthumbimage={IMAGES.PostImg5}
              data-src={IMAGES.PostImg5}
              className="grid-item"
            >
              <img src={IMAGES.PostImg5} alt="" />
            </a>
            <a
              href={IMAGES.PostImg6}
              data-exthumbimage={IMAGES.PostImg6}
              data-src={IMAGES.PostImg6}
              className="grid-item gallery-more"
              data-more="+3"
            >
              <img src={IMAGES.PostImg6} alt="" />
            </a>
          </LightGallery>
          <div className="clearfix">
            <p className="fs-14 mb-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
          <CardFooterContent />
        </div>
      </div>
    </Fragment>
  );
}
export default CardGalleryTwo;
