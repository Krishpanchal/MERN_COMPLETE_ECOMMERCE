import axios from "axios";
import {
  All_PRODUCTS_FAIL,
  All_PRODUCTS_REQUEST,
  All_PRODUCTS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const getProducts =
  (searchProduct = "", currentPage, price, category, rating) =>
  async (dispatch) => {
    try {
      dispatch({
        type: All_PRODUCTS_REQUEST,
      });

      let link = `/api/v1/products?page=${currentPage}&limit=4&keyword=${searchProduct}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

      if (category)
        link = `/api/v1/products?page=${currentPage}&limit=4&keyword=${searchProduct}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;

      const response = await axios.get(link);

      dispatch({
        type: All_PRODUCTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: All_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const response = await axios.get(`/api/v1/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: response.data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
