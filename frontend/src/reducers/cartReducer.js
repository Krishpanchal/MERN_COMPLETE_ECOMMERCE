import {
  ADD_ITEM_TO_CART_FAIL,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  FETCH_CART_ITEMS_FAIL,
  FETCH_CART_ITEMS_REQUEST,
  FETCH_CART_ITEMS_SUCCESS,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
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
        cartItemsLength: action.payload.cartItemsLength,
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

    case ADD_ITEM_TO_CART_REQUEST:
      return {
        ...state,
        cartLoading: true,
      };

    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};
