import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../constants/actionTypes';

const initialState = {
  access_token: localStorage.getItem('access_token'),
  refresh_token: localStorage.getItem('refresh_token'),
  isAuthenticated: localStorage.getItem('access_token') && localStorage.getItem('refresh_token') ? true : false,
  isLoading: false,
  user: null,
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
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return {
        ...state,
        access_token: null,
        refresh_token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}