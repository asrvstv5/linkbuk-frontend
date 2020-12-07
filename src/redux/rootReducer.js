import { combineReducers } from 'redux';
import userReducer from './User/reducer';

export const rootReducer = combineReducers({
    user: userReducer,
})