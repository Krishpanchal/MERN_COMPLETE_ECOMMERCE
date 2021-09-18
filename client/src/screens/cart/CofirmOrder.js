import React, { Fragment } from "react";
import Metadata from "../../components/layout/Metadata";
import CheckoutSteps from "../../components/Cart/CheckoutSteps";
import OrderConfirm from "../../components/Cart/OrderConfirm";

const CofirmOrder = () => {
  return (
    <Fragment>
      <Metadata title='Confirm Order' />
      <CheckoutSteps shipping confirmOrder />
      <OrderConfirm />
    </Fragment>
  );
};

export default CofirmOrder;
