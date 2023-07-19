import { combineReducers } from 'redux';
import api from './api';
import gravatar from './gravatar';

const rootReducer = combineReducers({ api, gravatar });

export default rootReducer;
