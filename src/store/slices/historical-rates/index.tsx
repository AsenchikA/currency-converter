import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { SUCCESS_CODE } from '@constants/index';
import { TLoadingStatus } from '@custom-types/index';
import { RootState } from '@store/index';

import { selectCurrencyObj } from '../currencies';

interface IFetchHistoricalRatesResponse {
  base: string;
  date: string;
  historical: boolean;
  rates: Record<string, number>;
  success: boolean;
  timestamp: number;
}

const fetchHistoricalRates = createAsyncThunk<IFetchHistoricalRatesResponse, { date: string; base: string }>(
  'historicalTable/get',
  async ({ date, base }, { rejectWithValue }) => {
    if (!process.env.API_KEY) {
      return rejectWithValue('No API key provided');
    }

    const url = `https://api.apilayer.com/exchangerates_data/${date}?base=${base}`;

    const headers = new Headers();
    headers.append('apikey', process.env.API_KEY);

    const response = await fetch(url, { method: 'GET', headers });

    const parsedResponse: IFetchHistoricalRatesResponse = await response.json();

    if (response.status !== SUCCESS_CODE || !parsedResponse.success) {
      return rejectWithValue('There is an error, try again later');
    }

    return parsedResponse;
  }
);

interface IHistoricalTableState {
  baseCurrency: string;
  date: string;
  status: TLoadingStatus;
  rates: Record<string, number> | null;
}

const initialState: IHistoricalTableState = {
  baseCurrency: '',
  date: '',
  status: 'idle',
  rates: null,
};

const historicalTableSlice = createSlice({
  name: 'historicalTable',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoricalRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHistoricalRates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rates = action.payload.rates;
        state.baseCurrency = action.payload.base;
        state.date = action.payload.date;
      })
      .addCase(fetchHistoricalRates.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

const selectHistoricalRatesObj = (state: RootState) => state.historicalRates.rates;

const selectHistoricalRates = createSelector([selectHistoricalRatesObj, selectCurrencyObj], (ratesObj, currencyObj) => {
  if (!ratesObj || !currencyObj) {
    return [];
  }

  return Object.entries(ratesObj).map(([key, value]) => ({ name: key, caption: currencyObj[key], value }));
});

const selectHistoricalRatesStatus = (state: RootState) => state.historicalRates.status;
const selectHistoricalRatesBaseCurrency = (state: RootState) => state.historicalRates.baseCurrency;
const selectHistoricalRatesDate = (state: RootState) => state.historicalRates.date;

export {
  fetchHistoricalRates,
  selectHistoricalRates,
  selectHistoricalRatesStatus,
  selectHistoricalRatesBaseCurrency,
  selectHistoricalRatesDate,
};

export default historicalTableSlice.reducer;
