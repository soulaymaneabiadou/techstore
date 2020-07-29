import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  UPDATE_CART
} from './types';

export const addToCart = (product) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART, payload: product });
  } catch (error) {
    dispatch({ type: CLEAR_CART });
  }
};

export const updateCart = (id, quantity) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CART, payload: { id, quantity } });
  } catch (error) {
    dispatch({ type: CLEAR_CART });
  }
};

export const removeFromCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  } catch (error) {
    dispatch({ type: CLEAR_CART });
  }
};
