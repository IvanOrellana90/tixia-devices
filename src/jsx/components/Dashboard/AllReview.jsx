import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AllReviewsTable } from '../../content/AllData';

const AllReview = () => {
  const [data, setData] = useState(
    document.querySelectorAll('#all_review tbody tr')
  );
  const sort = 7;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove('d-none');
      } else {
        data[i].classList.add('d-none');
      }
    }
  };
  // use effect
  useEffect(() => {
    setData(document.querySelectorAll('#all_review tbody tr'));
    chackboxFun();
  }, [test]);

  activePag.current === 0 && chageData(0, sort);
  // paggination
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };
  const chackbox = document.querySelectorAll('.all_review_checkbox input');
  const motherChackBox = document.querySelector('.all_review_strg input');
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === 'all') {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };
  return (
    <div className="table-responsive rounded table-hover fs-14">
      <div id="all_review" className="dataTables_wrapper no-footer">
        <table
          className="table mb-4 dataTablesCard card-table p-0 review-table fs-14 dataTable no-footer"
          id="example5"
        >
          <thead>
            <tr role="row" className="all_review_strg">
              <th>
                <div className="form-check checkbox-primary">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox0001"
                    required
                    onClick={() => chackboxFun('all')}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox0001"
                  />
                </div>
              </th>
              <th>Customer</th>
              <th class="d-none d-lg-table-cell">Event NAME</th>
              <th>Stars Review</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {AllReviewsTable.map((elem, ind) => (
              <tr key={ind}>
                <td className="all_review_checkbox">
                  <div className="form-check checkbox-primary">
                    <input
                      type="checkbox"
                      onClick={() => chackboxFun()}
                      className="form-check-input"
                      id="customCheckBox00002"
                      required
                    />
                    <label
                      className="form-check-label"
                      htmlFor="customCheckBox00002"
                    />
                  </div>
                </td>
                <td>
                  <div class="media align-items-center tbl-img">
                    <img
                      class="img-fluid  me-3 d-none d-xl-inline-block"
                      width="70"
                      src={elem.image}
                      alt="DexignZone"
                    />
                    <div class="media-body">
                      <h4 class="font-w600 mb-1 ">Cindy Hawkins</h4>
                      <span>{elem.date}</span>
                    </div>
                  </div>
                </td>
                <td class="d-none d-lg-table-cell">
                  <p>{elem.title}</p>
                </td>
                <td>
                  <span class="star-review d-inline-block mb-2 fs-16">
                    <i class="fa fa-star fs-16 text-orange" />{' '}
                    <i class="fa fa-star fs-16 text-orange" />{' '}
                    <i class="fa fa-star fs-16 text-orange" />{' '}
                    <i class="fa fa-star fs-16 text-orange" />{' '}
                    <i class="fa fa-star fs-16 text-gray"></i>
                  </span>
                  <p class="mb-0 d-none d-xl-inline-block">{elem.review}</p>
                </td>
                <td>
                  <div class="d-flex">
                    <Link
                      to={'#'}
                      className="btn btn-primary btn-rounded text-white btn-sm px-4"
                    >
                      Publish
                    </Link>
                    <Link
                      to={'#'}
                      className="btn btn-outline-danger btn-rounded btn-sm ms-2 px-4"
                    >
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-sm-flex text-center justify-content-between">
          <div className="dataTables_info" id="example5_info">
            Showing {activePag.current * sort + 1} to{' '}
            {data.length > (activePag.current + 1) * sort
              ? (activePag.current + 1) * sort
              : data.length}{' '}
            of {data.length} entries
          </div>
          <div
            className="dataTables_paginate paging_simple_numbers"
            id="example5_paginate"
          >
            <Link
              className="paginate_button previous disabled"
              to="/reviews"
              onClick={() =>
                activePag.current > 0 && onClick(activePag.current - 1)
              }
            >
              <i className="fa fa-angle-double-left" />
            </Link>
            <span>
              {paggination.map((number, i) => (
                <Link
                  key={i}
                  to="/reviews"
                  className={`paginate_button  ${
                    activePag.current === i ? 'current' : ''
                  } ${i > 0 ? 'ms-1' : ''}`}
                  onClick={() => onClick(i)}
                >
                  {number}
                </Link>
              ))}
            </span>
            <Link
              className="paginate_button next"
              to="/reviews"
              onClick={() =>
                activePag.current + 1 < paggination.length &&
                onClick(activePag.current + 1)
              }
            >
              <i className="fa fa-angle-double-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReview;
