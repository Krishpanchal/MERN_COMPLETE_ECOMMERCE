import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getProductDetails,
} from "../../../actions/productActions";
import Loader from "../../../components/layout/Loader";
import UpdateProductForm from "../../../components/admin/products/UpdateProductForm";
import Metadata from "../../../components/layout/Metadata";
import { useAlert } from "react-alert";
import { RESET_PRODUCT } from "../../../constants/productConstants";

const UpdateProduct = () => {
  const { id } = useParams();
  const alert = useAlert();

  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      dispatch({ type: RESET_PRODUCT });
    }
  }, [error, alert, dispatch]);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return (
    <React.Fragment>
      <Metadata title={"New Product"} />
      {loading ? (
        <Loader />
      ) : (
        <UpdateProductForm product={product ? product : {}} />
      )}
    </React.Fragment>
  );
};

export default UpdateProduct;
