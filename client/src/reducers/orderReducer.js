import {
  GET_ORDERS,
  ORDERS_ERROR
} from '../actions/types';

const initialState = {
  list: [],
  count: 0,
  current: {},
  errors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        count: action.payload.count,
        list: action.payload.data,
      };

    case ORDERS_ERROR:
      return {
        ...state,
        errors: [action.payload],
      };

    default:
      return state;
  }
};
