import { store } from '@store/index';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export enum ESortOrder {
  UNDEFINED,
  ASCENDING,
  DESCENDING,
}

export type ISortColumnName = 'currency' | 'price';

export interface ISortState {
  columnName: ISortColumnName;
  order: ESortOrder;
}

export interface ICurrencyTableState {
  base: string;
  date: string;
  rates: Record<string, number> | null;
  loadingStatus: 'success' | 'pending' | 'failed';
  sortState: ISortState;
}

export interface IGetLatestResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export type IRootState = ReturnType<typeof store.getState>;

export type TDispatch = ThunkDispatch<IRootState, any, AnyAction>;
