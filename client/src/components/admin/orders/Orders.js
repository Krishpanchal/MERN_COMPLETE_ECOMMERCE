import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { clearErrors, deleteOrder } from "../../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import SpinLoader from "../../layout/SpinLoader";

const Orders = ({ orders }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.deleteOrder);
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus && order.orderStatus.includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Fragment>
            <Link
              to={`/admin/orders/${order._id}`}
              className='btn btn-primary py-1 px-2'>
              <i className='fa fa-eye'></i>
            </Link>
            <button
              className='btn btn-danger py-1 px-2 ml-2'
              onClick={() => handleDelete(order._id)}>
              {loading ? <SpinLoader /> : <i className='fa fa-trash'></i>}
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <MDBDataTable data={setOrders()} className='px-3' bordered striped hover />
  );
};

export default Orders;
