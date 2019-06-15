import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import httpApi from '../middlewares/api';

export const store = createStore(rootReducer, applyMiddleware(httpApi));

