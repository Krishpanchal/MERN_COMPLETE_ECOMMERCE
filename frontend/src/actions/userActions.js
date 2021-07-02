import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  CLEAR_ERRORS,
  LOAD_CURRENTUSER_SUCCESS,
  LOAD_CURRENTUSER_REQUEST,
  LOAD_CURRENTUSER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  UPATE_USER_PROFILE_REQUEST,
  UPATE_USER_PROFILE_FAIL,
  UPATE_USER_PROFILE_SUCCESS,
  UPATED_USER_PASSWORD_REQUEST,
  UPATED_USER_PASSWORD_SUCCESS,
  UPATED_USER_PASSWORD_FAIL,
  FORGOT_USER_PASSWORD_REQUEST,
  FORGOT_USER_PASSWORD_SUCCESS,
  FORGOT_USER_PASSWORD_FAIL,
  RESET_USER_PASSWORD_REQUEST,
  RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_FAIL,
} from "../constants/userConstants";

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "/api/v1/users/login",
      { email, password },
      config
    );

    console.log(response);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.post("/api/v1/users/signup", userData, config);

    console.log(response);
    dispatch({ type: SIGNUP_SUCCESS, payload: response.data.user });
  } catch (error) {
    console.log(error.response);

    dispatch({ type: SIGNUP_FAIL, payload: error.response.data.message });
  }
};

export const loadCurrentUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_CURRENTUSER_REQUEST });

    const response = await axios.get("/api/v1/users/me");

    dispatch({ type: LOAD_CURRENTUSER_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({
      type: LOAD_CURRENTUSER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/users/logout");
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: LOGOUT_USER_FAIL });
  }
};

export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPATE_USER_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.patch(
      "/api/v1/users/updateMe",
      userData,
      config
    );

    console.log(response);
    dispatch({
      type: UPATE_USER_PROFILE_SUCCESS,
      payload: response.data.success,
    });
  } catch (error) {
    console.log(error.response);

    dispatch({
      type: UPATE_USER_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateUserPassword = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPATED_USER_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.patch(
      "/api/v1/users/updateMyPassword",
      userData,
      config
    );

    console.log(response);
    dispatch({
      type: UPATED_USER_PASSWORD_SUCCESS,
      payload: response.data.success,
    });
  } catch (error) {
    console.log(error.response);

    dispatch({
      type: UPATED_USER_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const forgotUserPassword = (userData) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_USER_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "/api/v1/users/forgotPassword",
      userData,
      config
    );

    console.log(response);
    dispatch({
      type: FORGOT_USER_PASSWORD_SUCCESS,
      payload: response.data.message,
    });
  } catch (error) {
    console.log(error.response);

    dispatch({
      type: FORGOT_USER_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const resetUserPassword = (userData, token) => async (dispatch) => {
  try {
    dispatch({ type: RESET_USER_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.patch(
      `/api/v1/users/resetPassword/${token}`,
      userData,
      config
    );

    console.log(response);
    dispatch({
      type: RESET_USER_PASSWORD_SUCCESS,
      payload: response.data.success,
    });
  } catch (error) {
    console.log(error.response);

    dispatch({
      type: RESET_USER_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
