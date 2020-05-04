import React, { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import axios from 'axios';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //actions
  // register user
  async function register({ name, email, password }) {
    try {
      //headers
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({ name, email, password });

      const res = await axios.post('api/users', body, config);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response.data.msg,
      });
    }
  }

  //login user
  async function login({ email, password }) {
    try {
      //headers
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      //request body
      const body = JSON.stringify({ email, password });

      const res = await axios.post('api/auth', body, config);
      
      dispatch({
          type: 'LOGIN_SUCCESS',
          payload: res.data,
        });
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data.msg,
      });
    }
  }

   //logout
   async function logout() {
    dispatch({
      type: 'LOGOUT_SUCCESS',
    });
  }

  //clear state.error
  async function errorClear(){
    dispatch({
      type: 'ERROR_CLEAR'
    });
  }

  async function tokenConfig() {
    const token = state.token
    //headers
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    //if token then add to headers
    if (token) {
      config.headers['x-auth-token'] = token;
    }

    return config;
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        isLoading: state.isLoading,
        login,
        logout,
        register,
        errorClear,
        tokenConfig,        
      }}>
      {children}
    </AuthContext.Provider>
  );
};

/* err.response.data, err.response.status */
