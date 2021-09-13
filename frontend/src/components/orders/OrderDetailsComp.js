import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderDetailsComp = ({ order }) => {
  const { user } = useSelector((state) => state.authReducer);

  const isPaid =
    order && order.paymentInfo && order.paymentInfo.status === "succeeded"
      ? true
      : false;

  return (
    <div className='row d-flex justify-content-between'>
      <div className='col-12 col-lg-8 mt-5 order-details'>
        <h1 className='my-5'>Order # {order._id}</h1>

        <h4 className='mb-4'>Shipping Info</h4>
        <p>
          <b>Name:</b> {user && user.name}
        </p>
        <p>
          <b>Phone:</b> {order.shippingInfo.phoneNumber}
        </p>
        <p className='mb-4'>
          <b>Address:</b>
          {order.shippingInfo.address}
        </p>
        <p>
          <b>Amount:</b> ${order.totalPrice}
        </p>

        <hr />

        <h4 className='my-4'>Payment</h4>
        <p className='greenColor'>
          <b className={isPaid ? "greenColor" : "redColor"}>
            {isPaid ? "PAID" : "NOT PAID"}
          </b>
        </p>

        <h4 className='my-4'>Order Status:</h4>
        <p
          className={
            order.orderStatus && order.orderStatus.includes("Delivered")
              ? "greenColor"
              : "redColor"
          }>
          <b>{order.orderStatus}</b>
        </p>

        <h4 className='my-4'>Order Items:</h4>

        <hr />
        <div className='cart-item my-1'>
          {order.orderItems.map((item) => (
            <div className='row my-5'>
              <div className='col-4 col-lg-2'>
                <img src={item.image} alt='Laptop' height='45' width='65' />
              </div>

              <div className='col-5 col-lg-5'>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
              </div>

              <div className='col-4 col-lg-2 mt-4 mt-lg-0'>
                <p>${item.price}</p>
              </div>

              <div className='col-4 col-lg-3 mt-4 mt-lg-0'>
                <p>{item.quantity} Piece(s)</p>
              </div>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default OrderDetailsComp;
