import {
  GET_PRODUCTS,
  SET_LOADING,
  PRODUCTS_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT
} from './types';

export const setCurrent = product => async dispatch => {
  try {
    setLoading();
    dispatch({ type: SET_CURRENT, payload: product });
  } catch (error) {
    dispatch({ type: CLEAR_CURRENT, payload: error });
  }
};

export const getProducts = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch('/api/products');
    const data = await res.json();
    dispatch({ type: GET_PRODUCTS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCTS_ERROR, payload: error });
  }
};

const setLoading = () => {
  return { type: SET_LOADING };
};
