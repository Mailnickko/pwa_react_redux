import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import initReducer from './initReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  init: initReducer,
  search: searchReducer,
  routing: routerReducer,
});

export default rootReducer;
