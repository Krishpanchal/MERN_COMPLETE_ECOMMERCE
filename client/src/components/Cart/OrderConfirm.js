import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const OrderConfirm = () => {
  const { user } = useSelector((state) => state.authReducer);
  const history = useHistory();
  const { shippingInfo, cartItems, cartTotalPrice } = useSelector(
    (state) => state.cartReducer
  );

  const shippingPrice = cartTotalPrice > 200 ? 25 : 0;
  const taxPrice = Number((0.05 * cartTotalPrice).toFixed(2));

  return (
    <div className='row d-flex justify-content-between'>
      <div className='col-12 col-lg-8 mt-5 order-confirm'>
        <h4 className='mb-3'>Shipping Info</h4>
        <p>
          <b>Name:</b> {user.name}
        </p>
        <p>
          <b>Phone:</b> {shippingInfo.phoneNumber}
        </p>
        <p className='mb-4'>
          <b>Address:</b>
          {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}, ${shippingInfo.postalCode}`}
        </p>

        <hr />
        <h4 className='mt-4'>Your Cart Items:</h4>

        <hr />

        {cartItems.map((item) => (
          <div key={item._id} className='cart-item my-1'>
            <div className='row'>
              <div className='col-4 col-lg-2'>
                <img
                  src={item.product.images[0].url}
                  alt='Laptop'
                  height='45'
                  width='65'
                />
              </div>

              <div className='col-5 col-lg-6'>
                <Link to={`/product/${item.product._id}`}>
                  {item.product.name}
                </Link>
              </div>

              <div className='col-4 col-lg-4 mt-4 mt-lg-0'>
                <p>
                  {item.totalQuantity} x ${item.product.price} ={" "}
                  <b>${item.totalPrice}</b>
                </p>
              </div>
            </div>
          </div>
        ))}
        <hr />
      </div>

      <div className='col-12 col-lg-3 my-4'>
        <div id='order_summary'>
          <h4>Order Summary</h4>
          <hr />
          <p>
            Subtotal:{" "}
            <span className='order-summary-values'>${cartTotalPrice}</span>
          </p>
          <p>
            Shipping:{" "}
            <span className='order-summary-values'>${shippingPrice}</span>
          </p>
          <p>
            Tax: <span className='order-summary-values'>${taxPrice}</span>
          </p>

          <hr />

          <p>
            Total:{" "}
            <span className='order-summary-values'>
              ${cartTotalPrice + shippingPrice + taxPrice}
            </span>
          </p>

          <hr />
          <button
            id='checkout_btn'
            className='btn btn-primary btn-block'
            onClick={() => history.push("/payment")}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
