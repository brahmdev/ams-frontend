import {combineReducers} from 'redux';
import UserLoginReducer from './userReducer';
import BranchReducer from './branchReducer';
import BoardReducer from './boardReducer';
import StandardReducer from './standardReducer';
import SubjectReducer from './subjectReducer';
import ChapterReducer from './chapterReducer';
import BatchReducer from './batchReducer';
import StudentReducer from './studentReducer';

const appReducer = combineReducers({
  user: UserLoginReducer,
  branch: BranchReducer,
  board: BoardReducer,
  standard: StandardReducer,
  subject: SubjectReducer,
  chapter: ChapterReducer,
  batch: BatchReducer,
  student: StudentReducer
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
