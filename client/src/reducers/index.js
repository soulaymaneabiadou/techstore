import { combineReducers } from 'redux';
import productReducer from './productReducer';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  store: productReducer
});
