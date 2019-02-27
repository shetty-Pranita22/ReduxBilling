import { combineReducers } from 'redux';
import billingReducer from './billingReducer';

export default combineReducers({
    data: billingReducer
});