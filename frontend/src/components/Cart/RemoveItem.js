import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteIemFromCart,
  fetchCartItems,
} from "../../actions/cartActions";
import { RESET_CART_ITEM } from "../../constants/cartConstants";

const RemoveItem = ({ cartId }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartLoading, success, error } = useSelector(
    (state) => state.deleteCartItem
  );

  const removeHandler = () => {
    dispatch(deleteIemFromCart(cartId));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  useEffect(() => {
    if (success) {
      alert.success("Item Removed!");
      dispatch({ type: RESET_CART_ITEM });
      dispatch(fetchCartItems());
    }
  }, [success, dispatch, alert]);

  return (
    <div className='col-4 col-lg-1 mt-4 mt-lg-0'>
      <i
        id='delete_cart_item'
        className='fa fa-trash btn btn-danger'
        onClick={removeHandler}></i>
    </div>
  );
};

export default RemoveItem;
