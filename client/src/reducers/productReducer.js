import {
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  SET_LOADING,
  SET_CURRENT,
  CLEAR_CURRENT,
} from '../actions/types';

const initialState = {
  products: [],
  current: {},
  count: 0,
  loading: true,
  errors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.data,
        count: action.payload.count,
        loading: false,
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
