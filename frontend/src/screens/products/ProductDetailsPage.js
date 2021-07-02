import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import ProductDetail from "../../components/products/ProductDetail";
import Loader from "../../components/layout/Loader";
import Metadata from "../../components/layout/Metadata";
import { useAlert } from "react-alert";

const ProductDetailsPage = ({ match }) => {
  const alert = useAlert();

  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.cartReducer);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const productId = match.params.id;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    console.log("Hello");

    dispatch(getProductDetails(productId));
  }, [dispatch, productId, error, alert]);

  useEffect(() => {
    if (success) {
      alert.success("Item added to cart");
    }
  }, [success, alert]);

  let content = error ? (
    <Fragment>
      <Metadata title={"No product found"} />
      <p>No product found</p>
    </Fragment>
  ) : (
    <Fragment>
      <Metadata title={product.name} />
      <ProductDetail product={product} />
    </Fragment>
  );

  return <Fragment>{loading ? <Loader /> : content}</Fragment>;
};

export default ProductDetailsPage;
