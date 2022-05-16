import { createSelector } from 'reselect';
import { ESortOrder, IRootState } from '@models/index';

export const selectCurrencyRates = (state: IRootState) => state.currencyTable.rates;

export const selectBaseCurrency = (state: IRootState) => state.currencyTable.base;

export const selectCurrencyList = createSelector(selectCurrencyRates, selectBaseCurrency, (rates, base) =>
  rates ? Object.keys(rates).concat(base).sort() : []
);

export const selectCurrentDate = (state: IRootState) => state.currencyTable.date;

export const selectCurrencyTableStatus = (state: IRootState) => state.currencyTable.loadingStatus;

export const selectIsCurrencyTableLoading = createSelector(selectCurrencyTableStatus, (status) => status === 'pending');

export const selectSortColumn = (state: IRootState) => state.currencyTable.sortState.columnName;

export const selectSortOrder = (state: IRootState) => state.currencyTable.sortState.order;

export const selectSortedCurrencyRates = createSelector(
  selectCurrencyRates,
  selectSortOrder,
  selectSortColumn,
  (currencyRates, sortOrder, sortColumn) => {
    if (currencyRates === null) {
      return null;
    }
    if (sortOrder === ESortOrder.UNDEFINED) {
      return currencyRates;
    } else if (sortOrder === ESortOrder.ASCENDING) {
      if (sortColumn === 'price') {
        return Object.fromEntries(Object.entries(currencyRates).sort((a, b) => a[1] - b[1]));
      }
      return Object.fromEntries(Object.entries(currencyRates).sort());
    } else {
      if (sortColumn === 'price') {
        return Object.fromEntries(Object.entries(currencyRates).sort((a, b) => b[1] - a[1]));
      }
      return Object.fromEntries(Object.entries(currencyRates).sort().reverse());
    }
  }
);
