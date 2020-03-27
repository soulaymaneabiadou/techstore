import axios from 'axios';
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  SET_LOADING,
  PRODUCTS_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPLOAD_PRODUCT
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
    const res = await fetch('/products');
    const data = await res.json();

    dispatch({ type: GET_PRODUCTS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCTS_ERROR, payload: error });
  }
};

export const createProduct = product => async dispatch => {
  try {
    setLoading();
    const formData = new FormData();
    formData.append('image', product.images[0]);
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        console.log(progressEvent);
        dispatch({
          type: UPLOAD_PRODUCT,
          payload: parseInt(
            Math.round((progressEvent.loaded) / progressEvent.total)
          )
        });
      }
    };
    await axios.post('/products', formData, config);
    dispatch({ type: ADD_PRODUCT });
  } catch (error) {
    dispatch({ type: PRODUCTS_ERROR, payload: error });
  }
};

const setLoading = () => {
  return { type: SET_LOADING };
};
