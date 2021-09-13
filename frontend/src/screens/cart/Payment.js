import React from "react";

import { Fragment } from "react";
import Metadata from "../../components/layout/Metadata";
import CheckoutSteps from "../../components/Cart/CheckoutSteps";
import PaymentComponent from "../../components/Cart/PaymentComponent";

const Payment = () => {
  return (
    <Fragment>
      <Metadata title='Payment' />
      <CheckoutSteps shipping confirmOrder payment />
      <PaymentComponent />
    </Fragment>
  );
};

export default Payment;
