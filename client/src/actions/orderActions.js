import axios from 'axios';
import {
  GET_ORDERS,
  ORDERS_ERROR
} from './types';

export const getOrders = () => async (dispatch) => {
  try {
    const res = await axios.get('/orders');
    dispatch({ type: GET_ORDERS, payload: res.data });
  } catch (error) {
    dispatch({ type: ORDERS_ERROR });
  }
};
