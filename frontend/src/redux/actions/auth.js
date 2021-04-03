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
  REGISTER_SUCCESS,
  REGISTER_FAIL,
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

    // handleSubmitWThen(event){
    //     event.preventDefault();
    //     axiosInstance.post('/token/obtain/', {
    //             username: this.state.username,
    //             password: this.state.password
    //         }).then(
    //             result => {
    //                 axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
    //                 localStorage.setItem('access_token', result.data.access);
    //                 localStorage.setItem('refresh_token', result.data.refresh);
    //             }
    //         ).catch (error => {
    //             throw error;
    //         })
    // }

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


// async handleSubmit(event) {
//         event.preventDefault();
//         try {
//             const response = await axiosInstance.post('/user/create/', {
//                 username: this.state.username,
//                 email: this.state.email,
//                 password: this.state.password
//             });
//             return response;
//         } catch (error) {
//             console.log(error.stack);
//             this.setState({
//                 errors:error.response.data
//             });
//         }
//     }

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


// async handleLogout() {
//         try {
//             const response = await axiosInstance.post('/blacklist/', {
//                 "refresh_token": localStorage.getItem("refresh_token")
//             });
//             localStorage.removeItem('access_token');
//             localStorage.removeItem('refresh_token');
//             axiosInstance.defaults.headers['Authorization'] = null;
//             return response;
//         }
//         catch (e) {
//             console.log(e);
//         }
//     };
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




// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};