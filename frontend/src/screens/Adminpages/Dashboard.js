import React, { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../actions/orderActions";
import { getAdminProducts } from "../../actions/productActions";
import Sidebar from "../../components/admin/Sidebar";
import SpinLoader from "../../components/layout/SpinLoader";

export const Dashboard = () => {
  const { loading, products } = useSelector((state) => state.products);
  const {
    loading: orderLoading,
    totalAmount,
    ordersLength,
  } = useSelector((state) => state.allOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "CLEAR_PRODUCTS" });
    dispatch(getAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const productsCount = loading ? (
    <SpinLoader />
  ) : products ? (
    products.length
  ) : (
    "No products"
  );

  let outOfStock = 0;
  products &&
    products.forEach((product) => {
      if (product.stock === 0) {
        console.log("Out");
        outOfStock = outOfStock + 1;
      }
    });

  const outOfStockProductsCount = loading ? (
    <SpinLoader />
  ) : outOfStock ? (
    outOfStock
  ) : (
    0
  );

  console.log(ordersLength);
  console.log(totalAmount);

  const ordersCount = orderLoading ? <SpinLoader /> : ordersLength;
  const totalOrdersAmount = orderLoading ? (
    <SpinLoader />
  ) : (
    `${totalAmount.toFixed(2)}`
  );

  return (
    <Fragment>
      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>

        <div className='col-12 col-md-10'>
          <h1 className='my-4'>Dashboard</h1>
          <div className='row pr-4'>
            <div className='col-xl-12 col-sm-12 mb-3'>
              <div className='card text-white bg-primary o-hidden h-100'>
                <div className='card-body'>
                  <div className='text-center card-font-size'>
                    Total Amount
                    <br /> <b>{totalOrdersAmount}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row pr-4'>
            <div className='col-xl-3 col-sm-6 mb-3'>
              <div className='card text-white bg-success o-hidden h-100'>
                <div className='card-body'>
                  <div className='text-center card-font-size'>
                    Products
                    <br /> <b>{productsCount}</b>
                  </div>
                </div>
                <Link
                  className='card-footer text-white clearfix small z-1'
                  to='/admin/products'>
                  <span className='float-left'>View Details</span>
                  <span className='float-right'>
                    <i className='fa fa-angle-right'></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className='col-xl-3 col-sm-6 mb-3'>
              <div className='card text-white bg-danger o-hidden h-100'>
                <div className='card-body'>
                  <div className='text-center card-font-size'>
                    Orders
                    <br /> <b>{ordersCount}</b>
                  </div>
                </div>
                <Link
                  className='card-footer text-white clearfix small z-1'
                  to='/admin/orders'>
                  <span className='float-left'>View Details</span>
                  <span className='float-right'>
                    <i className='fa fa-angle-right'></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className='col-xl-3 col-sm-6 mb-3'>
              <div className='card text-white bg-info o-hidden h-100'>
                <div className='card-body'>
                  <div className='text-center card-font-size'>
                    Users
                    <br /> <b>45</b>
                  </div>
                </div>
                <Link
                  className='card-footer text-white clearfix small z-1'
                  to='/admin/users'>
                  <span className='float-left'>View Details</span>
                  <span className='float-right'>
                    <i className='fa fa-angle-right'></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className='col-xl-3 col-sm-6 mb-3'>
              <div className='card text-white bg-warning o-hidden h-100'>
                <div className='card-body'>
                  <div className='text-center card-font-size'>
                    Out of Stock
                    <br /> <b>{outOfStockProductsCount}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
