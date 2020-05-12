import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  UPDATE_CART,
  PLACE_ORDER,
  ORDER_ERROR,
} from '../actions/types';

const initialState = {
  list: [],
  shop: [],
  total: 0,
  errors: [],
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
            shop: [
              ...state.shop,
              {
                id: action.payload._id,
                price: action.payload.price,
                quantity: 1,
              },
            ],
            total: state.total + action.payload.price,
          }
        : state;

    case UPDATE_CART:
      const ele = state.shop.findIndex((p) => p.id === action.payload.id);
      const accPrice =
        state.shop[ele].quantity < action.payload.quantity
          ? state.list[ele].price
          : -state.list[ele].price;

      state.shop[ele].quantity = action.payload.quantity;
      return {
        ...state,
        shop: [...state.shop],
        total: state.total + accPrice,
      };

    case REMOVE_FROM_CART:
      console.log(action.payload);
      const del = state.shop.filter(
        (product) => product._id !== action.payload
      )[0];
      return {
        ...state,
        list: [
          ...state.list.filter((product) => product._id !== action.payload),
        ],
        shop: [
          ...state.shop.filter((product) => product.id !== action.payload),
        ],
        total: state.total - del.price * del.quantity,
      };

    case CLEAR_CART:
    case PLACE_ORDER:
      return {
        list: [],
        shop: [],
        total: 0,
      };

    case ORDER_ERROR:
      return {
        ...state,
        errors: [action.payload],
      };

    default:
      return state;
  }
};
