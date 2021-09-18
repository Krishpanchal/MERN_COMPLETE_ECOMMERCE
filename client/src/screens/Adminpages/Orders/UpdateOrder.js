import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getOrderDetails } from "../../../actions/orderActions";
import OrderUpdateDetails from "../../../components/admin/orders/OrderUpdateDetails";
import Sidebar from "../../../components/admin/Sidebar";
import Loader from "../../../components/layout/Loader";
import Metadata from "../../../components/layout/Metadata";

const UpdateOrder = ({ match }) => {
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { isUpdated } = useSelector((state) => state.updateOrder);
  const dispatch = useDispatch();
  const alert = useAlert();
  const id = match.params.id;

  console.log("order ", order);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isUpdated) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, isUpdated, id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  return (
    <Fragment>
      <Metadata title='Update Order' />
      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>

        <div className='col-12 col-md-10'>
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              order && <OrderUpdateDetails order={order} />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateOrder;
