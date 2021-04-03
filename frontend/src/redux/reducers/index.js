import { combineReducers } from 'redux';
import word from './word';
import auth from './auth';
import errors from './errors';
import messages from './messages';

export const rootReducer = combineReducers({
  word,
  auth,
  errors,
  messages
});

export default rootReducer;