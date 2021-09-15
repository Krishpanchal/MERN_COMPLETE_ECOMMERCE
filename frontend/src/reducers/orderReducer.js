import {
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_MY_ORDERS_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_RESET,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_RESET,
  DELETE_ORDER_SUCCESS,
} from "../constants/orderConstants";

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
      };

    case CREATE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getMyOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_MY_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };

    case GET_MY_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
      };

    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getAllOrdersReducer = (state = [], action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        ordersLength: action.payload.orders.length,
        totalAmount: action.payload.totalAmount,
        loading: false,
      };

    case ALL_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isUpdated: false,
      };

    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const deleteOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isDeleted: false,
      };

    case DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
