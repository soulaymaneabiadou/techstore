import axios from 'axios';
import { GET_USERS, USERS_ERROR, SET_LOADING } from './types';

export const getUsers = (limit = 10, page = 1) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.get(`/users?role=user&limit=${limit}&page=${page}`);
    const data = res.data;

    dispatch({ type: GET_USERS, payload: data });
  } catch (error) {
    dispatch({ type: USERS_ERROR, payload: error });
  }
};

const setLoading = () => {
  return { type: SET_LOADING };
};
