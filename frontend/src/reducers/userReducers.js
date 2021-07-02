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
  RESET_USER_UPDATE_PROFILE,
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

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case LOAD_CURRENTUSER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case LOAD_CURRENTUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
        isAuthenticated: true,
      };

    case LOAD_CURRENTUSER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        user: null,
      };

    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: null,
        user: null,
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

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPATE_USER_PROFILE_REQUEST:
    case UPATED_USER_PASSWORD_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case UPATE_USER_PROFILE_SUCCESS:
    case UPATED_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdated: action.payload,
        error: null,
      };

    case UPATE_USER_PROFILE_FAIL:
    case UPATED_USER_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        isUpdated: false,
        error: action.payload,
      };

    case RESET_USER_UPDATE_PROFILE:
      return {
        ...state,
        isLoading: false,
        isUpdated: false,
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

export const forgotAndResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_USER_PASSWORD_REQUEST:
    case RESET_USER_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: null,
        error: null,
      };

    case FORGOT_USER_PASSWORD_SUCCESS:
    case RESET_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        error: null,
      };

    case FORGOT_USER_PASSWORD_FAIL:
    case RESET_USER_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        message: null,
      };

    case RESET_USER_UPDATE_PROFILE:
      return {
        ...state,
        isLoading: false,
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
