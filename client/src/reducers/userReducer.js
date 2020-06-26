import {
  GET_USERS,
  USERS_ERROR,
  SET_LOADING,
  SET_CURRENT,
  CLEAR_CURRENT
} from '../actions/types';

const initialState = {
  all: [],
  current: {},
  count: 0,
  loading: true,
  errors: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USERS:
      return {
        ...state,
        all: action.payload.data,
        count: action.payload.count,
        loading: false
      };
    case USERS_ERROR:
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
    case CLEAR_CURRENT:
      return {
        ...state,
        errors: action.payload
      };

    default:
      return state;
  }
};
