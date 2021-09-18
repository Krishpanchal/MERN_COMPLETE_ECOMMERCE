import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItemToCart } from "../../actions/cartActions";
import SpinLoader from "../../components/layout/SpinLoader";
import { Fragment } from "react";
import SubmitProductReview from "../reivew/SubmitProductReview";
import ReviewsList from "../reivew/ReviewsList";

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { cartLoading, cartItems } = useSelector((state) => state.cartReducer);

  const doesItemExistInCart =
    cartItems &&
    cartItems.find((item) => {
      return item.product._id === id;
    });

  const addItemCart = () => {
    dispatch(addItemToCart(product._id, 1));
  };

  return (
    <div className='row f-flex justify-content-around'>
      <div className='col-12 col-lg-5 img-fluid' id='product_image'>
        <Carousel pause='hover'>
          {product.images &&
            product.images.map((image) => (
              <Carousel.Item key={image.public_id}>
                <img
                  className='d-block w-100'
                  src={image.url}
                  alt={product.title}
                />
              </Carousel.Item>
            ))}
        </Carousel>
      </div>

      <div className='col-12 col-lg-5 mt-5'>
        <h3>{product.name}</h3>
        <p id='product_id'>Product # {product._id}</p>

        <hr />

        <div className='rating-outer'>
          <div
            className='rating-inner'
            style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
        </div>
        <span id='no_of_reviews'>({product.numOfReviews} Reviews)</span>

        <hr />

        <p id='product_price'>${product.price}</p>

        {cartLoading ? (
          <SpinLoader />
        ) : doesItemExistInCart ? (
          <Link to={"/cart"}>
            <button
              type='button'
              id='cart_btn'
              className='btn btn-primary d-inline ml-4'>
              Go to Cart
            </button>
          </Link>
        ) : (
          <Fragment>
            <button
              type='button'
              id='cart_btn'
              className='btn btn-primary d-inline ml-4'
              onClick={addItemCart}
              disabled={product.stock === 0 || cartLoading}>
              {cartLoading ? <SpinLoader /> : "Add to cart"}
            </button>
          </Fragment>
        )}

        <hr />

        <p>
          Status:{" "}
          <span
            id='stock_status'
            className={product.stock > 0 ? "greenColor" : "redColor"}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>

        <hr />

        <h4 className='mt-2'>Description:</h4>
        <p>{product.description}</p>
        <hr />
        <p id='product_seller mb-3'>
          Sold by: <strong>{product.seller}</strong>
        </p>
        <SubmitProductReview id={product._id} />
        {product.reviews && product.reviews.length > 0 && (
          <ReviewsList reviews={product.reviews} />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
