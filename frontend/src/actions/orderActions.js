import axios from "axios";
import {
  CLEAR_ERRORS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_MY_ORDERS_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
} from "../constants/orderConstants";

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await axios.post("/api/v1/orders", order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: error.response.data.message,
    });
  }
};

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MY_ORDERS_REQUEST });

    const result = await axios.get("/api/v1/orders/me");
    console.log(result.data);

    dispatch({ type: GET_MY_ORDERS_SUCCESS, payload: result.data.orders });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: GET_MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const result = await axios.get(`/api/v1/orders/${id}`);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: result.data.order });
  } catch (error) {
    dispatch({
      type: GET_MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const result = await axios.get(`/api/v1/orders`);

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: {
        orders: result.data.orders,
        totalAmount: result.data.totalOrdersAmount,
      },
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.patch(
      `/api/v1/orders/${id}`,
      orderData,
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: response.data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const response = await axios.delete(`/api/v1/orders/${id}`);
    console.log(response.data);
    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: response.data.success,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
