import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import paymentsReducer from './paymentsReducer';

export default combineReducers({
  auth: authReducer,
  store: productReducer,
  users: userReducer,
  cart: cartReducer,
  payments: paymentsReducer
});
