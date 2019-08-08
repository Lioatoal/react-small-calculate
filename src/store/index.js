import { combineReducers, createStore } from 'redux'
import {calculation} from './reducer';

const store = createStore(combineReducers({calculation}));

export default store