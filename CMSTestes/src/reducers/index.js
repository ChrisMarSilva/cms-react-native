import { combineReducers } from 'redux';
import nav from './NavReducer'; 
import AuthReducer from './AuthReducer';
import HomeReducer from './HomeReducer';

export default combineReducers({ 
   nav, 
   AuthReducer,
   HomeReducer,
});
