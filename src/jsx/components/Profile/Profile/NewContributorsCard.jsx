import { Fragment } from 'react';
import { IMAGES } from '../../../content/theme';

const ParticipantsData = [
  { image: IMAGES.Avat5, name: 'Karina Clark', number: '8' },
  { image: IMAGES.Avat6, name: 'Rober Doe', number: '6' },
  { image: IMAGES.Avat7, name: 'Olivia Wild', number: '7' },
  { image: IMAGES.Avat6, name: 'Rober Doe', number: '5' },
  { image: IMAGES.Avatar6, name: 'Rober Doe', number: '3' },
];

function NewContributorsCard() {
  return (
    <Fragment>
      {ParticipantsData.map((item, index) => (
        <div className="d-flex align-items-center py-2" key={index}>
          <div className="d-inline-block position-relative">
            <img
              src={item.image}
              alt="logo"
              className="rounded-circle avatar avatar-sm"
            />
            <span className="fa fa-circle text-success position-absolute bottom-0 end-0 fs-8"></span>
          </div>
          <div className="clearfix ms-3">
            <h6 className="fs-13 mb-0 fw-semibold">{item.name}</h6>
            <span className="fs-13">8 Pending & 97 Completed Tasks</span>
          </div>
          <div className="clearfix ms-auto">
            <span className="badge badge-sm badge-light">{item.number}</span>
          </div>
        </div>
      ))}
      <div className="d-flex align-items-center py-2">
        <div className="d-inline-block position-relative">
          <div className="avatar avatar-sm bg-info-light text-info rounded-circle d-flex align-items-center justify-content-center">
            S
          </div>
          <span className="fa fa-circle bored border-light text-success position-absolute bottom-0 end-0 fs-8"></span>
        </div>
        <div className="clearfix ms-3">
          <h6 className="fs-13 mb-0 fw-semibold">Sean Bean</h6>
          <span className="fs-13">8 Pending & 97 Completed Tasks</span>
        </div>
        <div className="clearfix ms-auto">
          <span className="badge badge-sm badge-light">3</span>
        </div>
      </div>
    </Fragment>
  );
}
export default NewContributorsCard;
