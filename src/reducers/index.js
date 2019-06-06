import {combineReducers} from 'redux';
import UserLoginReducer from './userReducer';
import BoardReducer from './boardReducer';

const appReducer = combineReducers({
  user: UserLoginReducer,
  board: BoardReducer
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
