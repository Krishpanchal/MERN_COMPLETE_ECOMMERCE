import axios from "axios";
import {
  ADD_ITEM_TO_CART_FAIL,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  CLEAR_ERRORS,
  DELETE_ITEM_FROM_CART_FAIL,
  DELETE_ITEM_FROM_CART_REQUEST,
  DELETE_ITEM_FROM_CART_SUCCESS,
  FETCH_CART_ITEMS_FAIL,
  FETCH_CART_ITEMS_REQUEST,
  FETCH_CART_ITEMS_SUCCESS,
  REMOVE_ITEM_FROM_CART_FAIL,
  REMOVE_ITEM_FROM_CART_REQUEST,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const fetchCartItems = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_CART_ITEMS_REQUEST,
    });

    const response = await axios.get(`/api/v1/cart/me`);
    console.log(response.data);

    const cartTotalPrice = response.data.cartItems.reduce((total, cart) => {
      return total + cart.totalPrice;
    }, 0);

    const cartTotalQuantity = response.data.cartItems.reduce((total, cart) => {
      return total + cart.totalQuantity;
    }, 0);

    dispatch({
      type: FETCH_CART_ITEMS_SUCCESS,
      payload: {
        cartItems: response.data.cartItems,
        cartItemsLength: response.data.results,
        cartTotalPrice: cartTotalPrice,
        cartTotalQuantity: cartTotalQuantity,
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

    dispatch({
      type: ADD_ITEM_TO_CART_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_TO_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const removeItemToCart = (productId, quantity) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_ITEM_FROM_CART_REQUEST,
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

    dispatch({
      type: REMOVE_ITEM_FROM_CART_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_ITEM_FROM_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteIemFromCart = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ITEM_FROM_CART_REQUEST,
    });

    const response = await axios.delete(`/api/v1/cart/me/${productId}`);
    console.log(response.data);

    dispatch({
      type: DELETE_ITEM_FROM_CART_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ITEM_FROM_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
