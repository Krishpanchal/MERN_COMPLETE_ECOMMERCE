import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllOrders } from "../../../actions/orderActions";
import Sidebar from "../../../components/admin/Sidebar";
import Loader from "../../../components/layout/Loader";
import Orders from "../../../components/admin/orders/Orders";
import Metadata from "../../../components/layout/Metadata";

const AllOrders = () => {
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.log("erro");
      alert.error(error);
      return dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  console.log(`orders: ${orders}`);
  console.log(`error: ${error}`);
  console.log(`loading: ${loading}`);

  return (
    <Fragment>
      <Metadata title='All Products' />
      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>

        <div className='col-12 col-md-10'>
          <Fragment>
            <h1 className='my-5'>All Products</h1>
            {loading ? <Loader /> : <Orders orders={orders} />}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default AllOrders;
