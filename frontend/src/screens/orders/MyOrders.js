import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getMyOrders } from "../../actions/orderActions";
import Loader from "../../components/layout/Loader";
import Metadata from "../../components/layout/Metadata";
import OrdersList from "../../components/orders/OrdersList";

const MyOrders = () => {
  const { orders, error, loading } = useSelector((state) => state.getOrders);
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  return (
    <Fragment>
      <Metadata title='My Orders' />
      <h1 className='my-5'>Your Orders</h1>
      {loading ? <Loader /> : orders && <OrdersList orders={orders} />}
    </Fragment>
  );
};

export default MyOrders;
