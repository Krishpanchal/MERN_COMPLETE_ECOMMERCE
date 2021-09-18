import React, { useEffect } from "react";
import { Fragment } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getOrderDetails } from "../../actions/orderActions";
import OrderDetailsComp from "../../components/orders/OrderDetailsComp";
import Metadata from "../../components/layout/Metadata";
import Loader from "../../components/layout/Loader";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  console.log("order ", order);

  useEffect(() => {
    console.log("check request");
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log("no error");

    if (error) {
      console.log("error is there");

      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  return (
    <Fragment>
      <Metadata title={"Order Details"} />
      {loading ? <Loader /> : order && <OrderDetailsComp order={order} />}
    </Fragment>
  );
};

export default OrderDetails;
