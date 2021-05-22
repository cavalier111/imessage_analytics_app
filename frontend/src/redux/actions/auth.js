import axios from 'axios';
import { returnErrors } from './messages';
import axiosInstance from '../../axiosApi'
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  PING_SUCCESS,
  PING_FAIL,
} from '../constants/actionTypes';


// CHECK TOKEN & LOAD USER
// export const loadUser = () => (dispatch, getState) => {
//   // User Loading
//   dispatch({ type: USER_LOADING });

//   axios
//     .get('/api/auth/user', tokenConfig(getState))
//     .then((res) => {
//       dispatch({
//         type: USER_LOADED,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//       dispatch({
//         type: AUTH_ERROR,
//       });
//     });
// };

// LOGIN USER
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });
  axiosInstance
    .post('token/obtain/', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const pingAuth = () => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axiosInstance
    .get('hello/', config)
    .then((res) => {
      dispatch({
        type: PING_SUCCESS,
        payload: res.data,
      });
      return 
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: PING_FAIL,
      });
    });
};



export const refreshToken = ()  => (dispatch) => {
  axiosInstance
    .post('/token/refresh/', {refresh: localStorage.getItem('refresh_token')})
    .then((res) => {
        dispatch({
          type: REFRESH_SUCCESS,
          payload: res.data,
        });
        axiosInstance.defaults.headers['Authorization'] = "JWT " + res.data.access;
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REFRESH_FAIL,
      });
    });
};


// REGISTER USER
export const register = ({ username, password, email }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, email, password });

  axiosInstance
    .post('user/create/', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axiosInstance
    .post('blacklist/', { "refresh_token": localStorage.getItem("refresh_token") })
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      axiosInstance.defaults.headers['Authorization'] = null;
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

