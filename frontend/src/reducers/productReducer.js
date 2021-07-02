import {
  All_PRODUCTS_FAIL,
  All_PRODUCTS_REQUEST,
  All_PRODUCTS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const productReducer = (
  state = {
    products: [],
  },
  action
) => {
  switch (action.type) {
    case All_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case All_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        productsPerPage: action.payload.productsPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
        error: null,
      };

    case All_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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

export const productDetailsReducer = (
  state = {
    product: {},
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: null,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
