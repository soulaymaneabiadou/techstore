import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  store: productReducer,
  users: userReducer
});
