import {
  SET_LOADING,
  PAY_ORDER,
  PAYMENT_ERROR,
  LOAD_STRIPE
} from '../actions/types';

const initialState = {
  stripe: null,
  error: null,
  loading: true,
  paymentIntent: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };

    case LOAD_STRIPE:
      return {
        ...state,
        stripe: action.payload
      };

    case PAY_ORDER:
      return {
        ...state,
        loading: false,
        paymentIntent: action.payload
      };

    case PAYMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
