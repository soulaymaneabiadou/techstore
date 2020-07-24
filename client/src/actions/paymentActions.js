import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { SET_LOADING, PAY_ORDER, PAYMENT_ERROR, LOAD_STRIPE } from './types';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const stripeLoading = () => async (dispatch) => {
  setLoading();
  const stripe = await loadStripe(
    'pk_test_51FoQP1JbwatK9u7ABGgChf9IT5moSrb6iuSXyjUVsseuEgPpQn08gLkSRhRz3J66HEiAzmL5UAajokfZkqrczGdM00VgxVah71'
  );

  dispatch({ type: LOAD_STRIPE, payload: stripe });
};

export const getPaymentIntent = () => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.post('/payments', { amount: 5000 }, config);

    dispatch({ type: PAY_ORDER, payload: res.data.data });
  } catch (error) {
    dispatch({ type: PAYMENT_ERROR, payload: error });
  }
};

const setLoading = () => {
  return { type: SET_LOADING };
};
