import { CREATE_PAYMENT, PAYMENT_ERROR } from '../actions/types';

const initialState = {
  errors: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAYMENT:
      return {
        ...state
      };
    case PAYMENT_ERROR:
      return {
        ...state,
        errors: action.payload
      };

    default:
      return state;
  }
};
