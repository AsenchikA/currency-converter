import { combineReducers } from 'redux';
import { currencyTableReducer } from './currency-table';

export default combineReducers({
  currencyTable: currencyTableReducer,
});
