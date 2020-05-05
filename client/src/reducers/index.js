import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';

export default combineReducers({
  auth: authReducer,
  store: productReducer,
  users: userReducer,
  cart: cartReducer
});
