import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './types';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const loadUser = () => async dispatch => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await axios.get('/auth/me');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = userData => async dispatch => {
  try {
    const res = await axios.post('/auth/register', userData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    loadUser();
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.errors || [error.response.data]
    });
  }
};

export const login = userData => async dispatch => {
  try {
    const res = await axios.post('/auth/login', userData, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    loadUser();
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.errors || [error.response.data]
    });
  }
};
