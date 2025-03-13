import { Fragment } from 'react';
import PageTitle from '../../layouts/PageTitle';
import { OtherColor, SolidColorOption } from '../../content/AllData';

export default function Colors() {
  return (
    <Fragment>
      <PageTitle motherMenu={'Bootstrap'} activeMenu={'Colors'} />
      <div className="row">
        <div className="col-xl-6 col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Solid Background Colors</h4>
            </div>
            <div className="card-body">
              {SolidColorOption.map((item, ind) => (
                <div className={`p-3 mb-2 ${item.chossecolor}`} key={ind}>
                  .{item.tilte}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Background Gradient</h4>
            </div>
            <div className="card-body">
              {SolidColorOption.map((elem, ind) => (
                <div
                  className={`p-3 mb-2 bg-gradient ${elem.chossecolor}`}
                  key={ind}
                >
                  .{elem.tilte} bg-gradient
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Background Opacity</h4>
            </div>
            <div className="card-body">
              <div className="bg-success p-2 text-white">
                This is default success background
              </div>
              <div className="bg-success p-2 text-white bg-opacity-75">
                This is 75% opacity success background
              </div>
              <div className="bg-success p-2 text-dark bg-opacity-50">
                This is 50% opacity success background
              </div>
              <div className="bg-success p-2 text-dark bg-opacity-25">
                This is 25% opacity success background
              </div>
              <div className="bg-success p-2 text-dark bg-opacity-10">
                This is 10% opacity success background
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Other Colors</h4>
            </div>
            <div className="card-body">
              <div className="row">
                {OtherColor.map((elem, index) => (
                  <div className="col-xl-3 col-sm-6 mb-4" key={index}>
                    {elem.innerContent &&
                      elem.innerContent.map((data, ind) => (
                        <div
                          className={`p-3 mb-2 text-white bs-${data.colorStyle1}`}
                          key={ind}
                        >
                          .bs-{data.colorStyle1}
                        </div>
                      ))}
                  </div>
                ))}
                <div className="col-xl-3 col-sm-6 mb-4">
                  <div className="p-3 mb-2 bg-black text-white">.bg-black</div>
                  <div className="p-3 mb-2 bg-white border">.bg-white</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
