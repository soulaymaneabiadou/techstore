import {
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  SET_LOADING,
  SET_CURRENT,
  CLEAR_CURRENT,
  ADD_TO_CART,
  CLEAR_CART,
} from '../actions/types';

const initialState = {
  products: [],
  cart: [],
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
    case ADD_TO_CART:
      localStorage.setItem('cart', [JSON.stringify(...state.cart), JSON.stringify(action.payload)])
      return {
        ...state,
        cart: [...state.cart, action.payload],
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
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};
