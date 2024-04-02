import { combineReducers } from 'redux';
import AuthReducer from './auth';
import ApplicationReducer from './application';
import DataReducer from './data';

export default combineReducers({
  auth: AuthReducer,
  application: ApplicationReducer,
  data: DataReducer,
});
