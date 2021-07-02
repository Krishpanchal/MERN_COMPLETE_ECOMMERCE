import axios from "axios";
import {
  ADD_ITEM_TO_CART_FAIL,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  FETCH_CART_ITEMS_FAIL,
  FETCH_CART_ITEMS_REQUEST,
  FETCH_CART_ITEMS_SUCCESS,
} from "../constants/cartConstants";

export const fetchCartItems = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_CART_ITEMS_REQUEST,
    });

    const response = await axios.get(`/api/v1/cart/me`);
    console.log(response.data);

    dispatch({
      type: FETCH_CART_ITEMS_SUCCESS,
      payload: {
        cartItems: response.data.cartItems,
        cartItemsLength: response.data.results,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_CART_ITEMS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addItemToCart = (productId, quantity) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_ITEM_TO_CART_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `/api/v1/cart/${productId}`,
      {
        totalQuantity: quantity,
      },
      config
    );
    console.log(response.data);

    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_TO_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};
