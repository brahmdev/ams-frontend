import {combineReducers} from 'redux';
import UserLoginReducer from './userReducer';
import BoardReducer from './boardReducer';
import StandardReducer from './standardReducer';

const appReducer = combineReducers({
  user: UserLoginReducer,
  board: BoardReducer,
  standard: StandardReducer
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
