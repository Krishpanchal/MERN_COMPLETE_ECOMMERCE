import React from "react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../../components/admin/Sidebar";
import AllProducts from "../../../components/admin/products/AllProducts";

import Loader from "../../../components/layout/Loader";
import Metadata from "../../../components/layout/Metadata";
import { useEffect } from "react";
import { clearErrors, getAdminProducts } from "../../../actions/productActions";
import { useAlert } from "react-alert";
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstants";

const AdminProducts = () => {
  const { loading, error, products } = useSelector((state) => state.products);
  const { isDeleted } = useSelector((state) => state.deleteProduct);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isDeleted) {
      alert.success("product deleted successfully!");
      dispatch(getAdminProducts());
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [isDeleted, dispatch, alert]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      return dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

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
            {loading ? <Loader /> : <AllProducts products={products} />}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminProducts;
