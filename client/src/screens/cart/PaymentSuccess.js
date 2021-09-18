import React from "react";
import { Fragment } from "react";
import Metadata from "../../components/layout/Metadata";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <Fragment>
      <Metadata title='Payment Success' />

      <div class='row justify-content-center'>
        <div class='col-6 mt-5 text-center'>
          <img
            class='my-5 img-fluid d-block mx-auto'
            src='https://freepngimg.com/thumb/success/6-2-success-png-image.png'
            alt='Order Success'
            width='200'
            height='200'
          />

          <h2>Your Order has been placed successfully.</h2>

          <Link to='/orders'>Go to Orders</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default PaymentSuccess;
