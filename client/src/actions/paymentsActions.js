import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { CREATE_PAYMENT, PAYMENT_ERROR } from './types';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const setStripe = async () => {
  const stripe = await loadStripe(
    'pk_test_51FoQP1JbwatK9u7ABGgChf9IT5moSrb6iuSXyjUVsseuEgPpQn08gLkSRhRz3J66HEiAzmL5UAajokfZkqrczGdM00VgxVah71'
  );

  return stripe;
};

const fetchCheckoutSession = async ({ price, quantity, product }) => {
  const res = await axios.post('/payments/', {
    price,
    quantity,
    product
  });

  return res.data.data;
};

export const createPayment = ({ price, quantity, product }) => async (
  dispatch
) => {
  try {
    const sessionId = await fetchCheckoutSession({ price, quantity, product });
    const stripe = await setStripe();

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.log(error);
    }

    dispatch({ type: CREATE_PAYMENT, payload: sessionId });
  } catch (error) {
    dispatch({
      type: PAYMENT_ERROR,
      payload: [error.response.data.error]
    });
  }
};
