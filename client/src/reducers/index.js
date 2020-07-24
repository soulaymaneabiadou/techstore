import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import paymentReducer from './paymentReducer';

export default combineReducers({
  auth: authReducer,
  shop: productReducer,
  users: userReducer,
  cart: cartReducer,
  orders: orderReducer,
  payments: paymentReducer
});
