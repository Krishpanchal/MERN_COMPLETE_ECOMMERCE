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
  RESET_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case FETCH_CART_ITEMS_REQUEST:
      return {
        ...state,
        cartLoading: true,
        cartError: null,
      };

    case FETCH_CART_ITEMS_SUCCESS:
      return {
        ...state,
        cartLoading: false,
        cartItems: action.payload.cartItems,
        cartItemsLength: action.payload.cartItems.length,
        cartTotalPrice: action.payload.cartTotalPrice,
        cartTotalQuantity: action.payload.cartTotalQuantity,
        cartError: null,
      };

    case FETCH_CART_ITEMS_FAIL:
      return {
        ...state,
        cartLoading: false,
        cartItems: null,
        cartItemsLength: null,
        cartError: action.payload,
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case RESET_CART_ITEM:
      return {
        ...state,
        success: false,
        cartLoading: false,
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

export const cartActionsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART_REQUEST:
    case REMOVE_ITEM_FROM_CART_REQUEST:
      return {
        ...state,
        cartLoading: true,
      };

    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        success: true,
        cartLoading: false,
        message: "Item added!",
      };
    case REMOVE_ITEM_FROM_CART_SUCCESS:
      return {
        ...state,
        success: true,
        cartLoading: false,
        message: "Item removed!",
      };

    case ADD_ITEM_TO_CART_FAIL:
    case REMOVE_ITEM_FROM_CART_FAIL:
      return {
        ...state,
        success: false,
        cartLoading: false,
        error: action.payload,
      };

    case RESET_CART_ITEM:
      return {
        ...state,
        success: false,
        cartLoading: false,
        message: null,
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

export const deleteItemReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ITEM_FROM_CART_REQUEST:
      return {
        ...state,
        cartLoading: true,
      };

    case DELETE_ITEM_FROM_CART_SUCCESS:
      return {
        ...state,
        success: true,
        cartLoading: false,
        message: "Item added!",
      };

    case DELETE_ITEM_FROM_CART_FAIL:
      return {
        ...state,
        success: false,
        cartLoading: false,
        error: action.payload,
      };

    case RESET_CART_ITEM:
      return {
        ...state,
        success: false,
        cartLoading: false,
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
