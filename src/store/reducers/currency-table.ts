import { AnyAction } from 'redux';
import { ESortOrder, ICurrencyTableState } from '@models/index';
import { getTodayDate } from '@utils/index';
import { currencyTableActionTypes } from '../action-creators/currency-table';

const defaultState: ICurrencyTableState = {
  base: 'EUR',
  date: getTodayDate(),
  rates: null,
  loadingStatus: 'pending',
  sortState: {
    columnName: 'currency',
    order: ESortOrder.UNDEFINED,
  },
};

export const currencyTableReducer = (state = defaultState, action: AnyAction): ICurrencyTableState => {
  switch (action.type) {
    case currencyTableActionTypes.SET_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case currencyTableActionTypes.SET_RATES:
      return {
        ...state,
        rates: action.payload,
      };
    case currencyTableActionTypes.SET_STATUS:
      return {
        ...state,
        loadingStatus: action.payload,
      };
    case currencyTableActionTypes.SET_BASE:
      return {
        ...state,
        base: action.payload,
      };
    case currencyTableActionTypes.SET_SORT_STATE:
      return {
        ...state,
        sortState: action.payload,
      };
    default:
      return state;
  }
};
