import { Fragment } from 'react';
import { IMAGES } from '../../../content/theme';

const socialBlog = [
  {
    image: IMAGES.Google,
    title: 'Piper Aerostar',
    subtitle: 'piper-aircraft-class.jsp',
    number: '0',
  },
  {
    image: IMAGES.Figma,
    title: 'Cirrus SR22',
    subtitle: 'cirrus-aircraft.jsp',
    number: '2',
  },
  {
    image: IMAGES.Slack,
    title: 'Beachcraft Baron',
    subtitle: 'baron-class.pyt',
    number: '3',
  },
  {
    image: IMAGES.Html,
    title: 'Cessna SF150',
    subtitle: 'cessna-aircraft-class.jsp',
    number: '0',
  },
];

function SocialBlogCard() {
  return (
    <Fragment>
      {socialBlog.map((ele, ind) => (
        <div
          className="d-flex align-items-center p-2 hover-bg-light rounded my-1"
          key={ind}
        >
          <div className="avatar avatar-md border border-secondary border-opacity-10 rounded d-flex align-items-center justify-content-center bg-white">
            <img src={ele.image} alt="" />
          </div>
          <div className="clearfix ms-3">
            <h6 className="fs-14 mb-0 fw-semibold">{ele.title}</h6>
            <span className="fs-13">{ele.subtitle}</span>
          </div>
          <div className="clearfix ms-auto">
            <span className="badge badge-sm badge-light">{ele.number}</span>
          </div>
        </div>
      ))}
    </Fragment>
  );
}
export default SocialBlogCard;
