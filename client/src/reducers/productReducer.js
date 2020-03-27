import {
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  SET_LOADING,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPLOAD_PRODUCT
} from '../actions/types';

const initialState = {
  products: null,
  current: null,
  count: 0,
  loading: true,
  uploading: null,
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.data,
        count: action.payload.count,
        loading: false
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case UPLOAD_PRODUCT:
      return {
        ...state,
        uploading: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        errors: action.payload
      };

    default:
      return state;
  }
};
