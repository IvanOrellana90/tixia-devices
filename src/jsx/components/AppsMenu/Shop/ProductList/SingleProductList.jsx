import React from 'react';
import { Link } from 'react-router-dom';

const SingleProductList = (props) => {
  const { previewImg, price, rating, availability, productCode, brand, des } =
    props.product;
  return (
    <div className="col-lg-6 col-xl-6">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-5 col-lg-12 col-xl-5">
              <div className="new-arrival-product mb-4 mb-xl-0">
                <div className="new-arrivals-img-contnent">
                  <img className="img-fluid" src={previewImg} alt="list" />
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-12 col-xl-7">
              <div className="new-arrival-content position-relative">
                <h4>
                  <Link to="/ecom-product-detail">
                    Solid Women's V-neck Dark T-Shirt
                  </Link>
                </h4>
                <div className="comment-review star-rating">
                  {rating}
                  <span className="review-text">(34 reviews) /</span>
                  <Link className="product-review" to="#">
                    Write a review?
                  </Link>
                  <p className="price">${price}</p>
                </div>
                <p>
                  Availability:
                  <span className="item">
                    {' '}
                    {availability}{' '}
                    <i className="fa fa-check-circle text-success"></i>
                  </span>
                </p>
                <p>
                  Product code:
                  <span className="item"> {productCode}</span>
                </p>
                <p>
                  Brand: <span className="item">{brand}</span>
                </p>
                <p className="text-content">{des}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductList;
