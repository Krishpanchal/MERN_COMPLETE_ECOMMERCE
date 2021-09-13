import { MDBDataTable } from "mdbreact";
import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const OrdersList = ({ orders }) => {
  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numofItems",
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
        numofItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus && order.orderStatus.includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Fragment>
            <Link to={`/order/${order._id}`} className='btn btn-primary '>
              <i className='fa fa-eye'></i>
            </Link>
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

export default OrdersList;
