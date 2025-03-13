import { Fragment } from 'react';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { IMAGES, SVGICON } from '../../../content/theme';
import { Link } from 'react-router-dom';
import CardFooterContent from '../Profile/CardFooterContent';

function CardGalleryOne() {
  return (
    <Fragment>
      <div className="card card-comment">
        <div className="card-body pb-0">
          <div className="d-flex justify-content-between mb-2">
            <div className="d-flex align-items-center py-2">
              <div className="d-inline-block position-relative">
                <img
                  src={IMAGES.Avatar2}
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
              href={IMAGES.PostFull1}
              data-exthumbimage={IMAGES.PostFull1}
              data-src={IMAGES.PostFull1}
              className="grid-item colspan-3 rowspan-2"
            >
              <img src={IMAGES.PostFull1} alt="fullpost" />
            </a>
            <a
              href={IMAGES.PostImg2}
              data-exthumbimage={IMAGES.PostImg2}
              data-src={IMAGES.PostImg2}
              className="grid-item"
            >
              <img src={IMAGES.PostImg2} alt="post2" />
            </a>
            <a
              href={IMAGES.PostImg1}
              data-exthumbimage={IMAGES.PostImg1}
              data-src={IMAGES.PostImg1}
              className="grid-item"
            >
              <img src={IMAGES.PostImg1} alt="post1" />
            </a>
            <a
              href={IMAGES.PostImg3}
              data-exthumbimage={IMAGES.PostImg3}
              data-src={IMAGES.PostImg3}
              className="grid-item gallery-more"
              data-more="+06"
            >
              <img src={IMAGES.PostImg3} alt="post3" />
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
export default CardGalleryOne;
