/** @format */
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGIN_ADMIN,
  GOOGLE_AUTH,
} from "./user.types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isAdmin: null,
  loading: true,
  user: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case GOOGLE_AUTH:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        isAdmin: false,
      };
    case LOGIN_ADMIN:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        isAdmin: true,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        isAdmin: false,
      };
    default:
      return state;
  }
};
