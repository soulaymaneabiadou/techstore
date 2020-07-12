import axios from 'axios';
import { GET_ORDERS, ORDERS_ERROR } from './types';

export const getOrders = (limit = 10, page = 1) => async (dispatch) => {
  try {
    const res = await axios.get(`/orders`);
    dispatch({ type: GET_ORDERS, payload: res.data });
  } catch (error) {
    dispatch({ type: ORDERS_ERROR });
  }
};
