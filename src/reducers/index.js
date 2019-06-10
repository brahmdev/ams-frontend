import {combineReducers} from 'redux';
import UserLoginReducer from './userReducer';
import BoardReducer from './boardReducer';
import StandardReducer from './standardReducer';
import SubjectReducer from './subjectReducer';
import ChapterReducer from './chapterReducer';
import BatchReducer from './batchReducer';

const appReducer = combineReducers({
  user: UserLoginReducer,
  board: BoardReducer,
  standard: StandardReducer,
  subject: SubjectReducer,
  chapter: ChapterReducer,
  batch: BatchReducer
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
