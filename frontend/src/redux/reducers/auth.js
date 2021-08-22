import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PING_SUCCESS,
  PING_FAIL,
} from '../constants/actionTypes';
import axiosInstance from '../../axiosApi'

const initialState = {
  access_token: localStorage.getItem('access_token'),
  refresh_token: localStorage.getItem('refresh_token'),
  isAuthenticated: false,
  isLoading: true,
  user: null,
  attemptedAuth: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    // case USER_LOADING:
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // case USER_LOADED:
    //   return {
    //     ...state,
    //     isAuthenticated: true,
    //     isLoading: false,
    //     user: action.payload,
    //   };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('access_token', action.payload.access);
      localStorage.setItem('refresh_token', action.payload.refresh);
      axiosInstance.defaults.headers['Authorization'] = localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null;
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        attemptedAuth: true,
      };
    case PING_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        attemptedAuth: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case PING_FAIL:
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return {
        ...state,
        access_token: null,
        refresh_token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        attemptedAuth: true,
      };
    default:
      return state;
  }
}