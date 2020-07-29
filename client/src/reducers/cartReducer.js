import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  UPDATE_CART
} from '../actions/types';

const initialState = {
  list: [],
  products: [],
  total: 0,
  errors: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const exist = state.list.filter(
        (product) => product._id === action.payload._id
      )[0];
      return !exist
        ? {
            ...state,
            list: [...state.list, action.payload],
            products: [
              ...state.products,
              {
                id: action.payload._id,
                unit_price: action.payload.price,
                ordered_quantity: 1
              }
            ],
            total: state.total + action.payload.price
          }
        : state;

    case UPDATE_CART:
      const ele = state.products.findIndex((p) => p.id === action.payload.id);
      const accPrice =
        state.products[ele].ordered_quantity < action.payload.quantity
          ? state.list[ele].price
          : -state.list[ele].price;

      state.products[ele].ordered_quantity = action.payload.quantity;
      return {
        ...state,
        products: [...state.products],
        total: state.total + accPrice
      };

    case REMOVE_FROM_CART:
      const del = state.products.filter(
        (product) => product._id !== action.payload
      )[0];
      return {
        ...state,
        list: [
          ...state.list.filter((product) => product._id !== action.payload)
        ],
        products: [
          ...state.products.filter((product) => product.id !== action.payload)
        ],
        total: state.total - del.price * del.ordered_quantity
      };

    case CLEAR_CART:
      return {
        ...state,
        list: [],
        products: [],
        total: 0
      };

    default:
      return state;
  }
};
