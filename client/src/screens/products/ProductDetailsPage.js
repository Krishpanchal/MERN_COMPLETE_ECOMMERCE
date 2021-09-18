import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import ProductDetail from "../../components/products/ProductDetail";
import Loader from "../../components/layout/Loader";
import Metadata from "../../components/layout/Metadata";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { RESET_CART_ITEM } from "../../constants/cartConstants";
// import { RESET_PRODUCT } from "../../constants/productConstants";

const ProductDetailsPage = ({ match }) => {
  const alert = useAlert();
  const history = useHistory();

  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.cartActionsReducer);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const productId = match.params.id;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProductDetails(productId));
  }, [dispatch, productId, error, alert]);

  useEffect(() => {
    if (success) {
      history.push("/cart");
      alert.success("Item added to cart");
      dispatch({ type: RESET_CART_ITEM });
    }
  }, [success, alert, history, dispatch]);

  useEffect(() => {
    return () => {
      dispatch({ type: "CLEAR_PRODUCTS" });
      console.log("Hello");
    };
  }, [dispatch]);

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
