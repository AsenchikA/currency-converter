import { currencyTableApi } from '@api/currency-table';
import { IRootState, ISortState, TDispatch } from '@models/index';
import { selectBaseCurrency, selectCurrentDate } from '@store/selectors';

export const currencyTableActionTypes = {
  SET_STATUS: 'CURRENCY_TABLE_SET_STATUS',
  SET_RATES: 'CURRENCY_TABLE_SET_RATES',
  SET_BASE: 'CURRENCY_TABLE_SET_BASE',
  SET_DATE: 'CURRENCY_TABLE_SET_DATE',
  SET_SORT_STATE: 'CURRENCY_TABLE_SET_SORT_STATE',
};

export const getLatestRates = () => (dispatch: TDispatch, getState: () => IRootState) => {
  dispatch({ type: currencyTableActionTypes.SET_STATUS, payload: 'pending' });

  const state = getState();
  const baseCurrency = selectBaseCurrency(state);

  return currencyTableApi
    .getLatestRates(baseCurrency)
    .then((response) => {
      dispatch({ type: currencyTableActionTypes.SET_RATES, payload: response.rates });
      dispatch({ type: currencyTableActionTypes.SET_STATUS, payload: 'success' });
    })
    .catch(() => {
      dispatch({ type: currencyTableActionTypes.SET_STATUS, payload: 'failed' });
    });
};

export const getRatesByDate = () => (dispatch: TDispatch, getState: () => IRootState) => {
  dispatch({ type: currencyTableActionTypes.SET_STATUS, payload: 'pending' });

  const state = getState();
  const currentDate = selectCurrentDate(state);

  return currencyTableApi
    .getRatesByDate(currentDate)
    .then((response) => {
      dispatch({ type: currencyTableActionTypes.SET_RATES, payload: response.rates });
      dispatch({ type: currencyTableActionTypes.SET_STATUS, payload: 'success' });
    })
    .catch(() => {
      dispatch({ type: currencyTableActionTypes.SET_STATUS, payload: 'failed' });
      dispatch({ type: currencyTableActionTypes.SET_RATES, payload: [] });
    });
};

export const setBaseCurrency = (currency: string) => (dispatch: TDispatch) => {
  dispatch({ type: currencyTableActionTypes.SET_BASE, payload: currency });
  dispatch(getLatestRates());
};

export const setDate = (date: string) => (dispatch: TDispatch, getState: () => IRootState) => {
  const state = getState();
  const currentDate = selectCurrentDate(state);

  if (date === currentDate) {
    return;
  }

  dispatch({ type: currencyTableActionTypes.SET_DATE, payload: date });

  if (date !== '') {
    dispatch(getRatesByDate());
  }
};

export const setSortState = (sortState: ISortState) => (dispatch: TDispatch) => {
  dispatch({ type: currencyTableActionTypes.SET_SORT_STATE, payload: sortState });
};
