import {combineReducers} from 'redux';
import UserLoginReducer from './userReducer';
import BoardReducer from './boardReducer';
import StandardReducer from './standardReducer';
import SubjectReducer from './subjectReducer';

const appReducer = combineReducers({
  user: UserLoginReducer,
  board: BoardReducer,
  standard: StandardReducer,
  subject: SubjectReducer
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
