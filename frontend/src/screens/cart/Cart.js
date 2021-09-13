import React, { Fragment } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, fetchCartItems } from "../../actions/cartActions";
import CartItem from "../../components/Cart/CartItem";
import Loader from "../../components/layout/Loader";
import SpinLoader from "../../components/layout/SpinLoader";
import { RESET_CART_ITEM } from "../../constants/cartConstants";

const Cart = ({ history }) => {
  const { cartItems, cartLoading, cartTotalPrice, cartTotalQuantity, error } =
    useSelector((state) => state.cartReducer);
  const {
    cartLoading: addCartLoader,
    success,
    message,
  } = useSelector((state) => state.cartActionsReducer);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  useEffect(() => {
    if (success) {
      alert.success(message);
      dispatch(fetchCartItems());
      dispatch({ type: RESET_CART_ITEM });
    }
  }, [success, alert, dispatch, message]);
  return (
    <Fragment>
      {cartLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className='mt-5'>
            {cartItems.length === 0
              ? `Your cart is empty`
              : `Your Cart:${cartItems.length} items`}
          </h2>

          <div className='row d-flex justify-content-between'>
            {cartItems.map((cart) => {
              return <CartItem key={cart._id} cartId={cart._id} cart={cart} />;
            })}

            <div className='col-12 col-lg-3 my-4'>
              <div id='order_summary'>
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className='order-summary-values'>
                    {addCartLoader ? <SpinLoader /> : cartTotalQuantity} (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className='order-summary-values'>
                    {addCartLoader ? (
                      <SpinLoader />
                    ) : (
                      `$${cartTotalPrice.toFixed(2)}`
                    )}
                  </span>
                </p>

                <hr />
                <button
                  id='checkout_btn'
                  className='btn btn-primary btn-block'
                  onClick={() => history.push("/shipping")}>
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
