import React from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addItemToCart,
  clearErrors,
  removeItemToCart,
} from "../../actions/cartActions";
import SpinLoader from "../layout/SpinLoader";
import RemoveItem from "./RemoveItem";

const Item = ({ product, totalPrice, totalQuantity, cartId }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { cartLoading, error } = useSelector(
    (state) => state.cartActionsReducer
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  const decreaseQty = () => {
    dispatch(removeItemToCart(product._id, totalQuantity - 1));
  };

  const increaseQty = () => {
    dispatch(addItemToCart(product._id, totalQuantity + 1));
  };

  return (
    <div className='col-12 col-lg-8'>
      <hr />
      <div className='cart-item'>
        <div className='row'>
          <div className='col-4 col-lg-3'>
            <Link to={`/product/${product._id}`}>
              <img
                src={product.images[0].url}
                alt='Laptop'
                height='90'
                width='115'
              />
            </Link>
          </div>

          <div className='col-5 col-lg-3'>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </div>

          <div className='col-4 col-lg-2 mt-4 mt-lg-0'>
            <p id='card_item_price'>
              {cartLoading ? <SpinLoader /> : `$${totalPrice}`}
            </p>
          </div>

          {cartLoading ? (
            <SpinLoader />
          ) : (
            <div className='col-4 col-lg-3 mt-4 mt-lg-0'>
              <div className='stockCounter d-inline'>
                <button
                  className='btn btn-danger minus'
                  onClick={decreaseQty}
                  disabled={totalQuantity === 1}>
                  -
                </button>
                <input
                  type='number'
                  className='form-control count d-inline'
                  value={totalQuantity}
                  readOnly
                />

                <button className='btn btn-primary plus' onClick={increaseQty}>
                  +
                </button>
              </div>
            </div>
          )}

          <RemoveItem cartId={cartId} />
        </div>
      </div>
      <hr />
    </div>
  );
};

const NoProduct = () => {
  return (
    <div className='col-12 col-lg-8'>
      <hr />
      <h3>Product no longer exists</h3>
      <hr />
    </div>
  );
};

const CartItem = ({ cart, cartId }) => {
  console.log(cart);

  const cartItem = cart.product ? (
    <Item
      product={cart.product}
      totalPrice={cart.totalPrice}
      totalQuantity={cart.totalQuantity}
      cartId={cartId}
    />
  ) : (
    <NoProduct />
  );

  return cartItem;
};

export default CartItem;
