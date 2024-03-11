import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { SUCCESS_CODE } from '@constants/index';
import { TLoadingStatus } from '@custom-types/index';
import { RootState } from '@store/index';

interface IFetchCurrenciesResponse {
  success: boolean;
  symbols: Record<string, string>;
}

const fetchCurrencies = createAsyncThunk('symbols/getList', async (_, { rejectWithValue }) => {
  if (!process.env.API_KEY) {
    return rejectWithValue('No API key provided');
  }

  const url = 'https://api.apilayer.com/exchangerates_data/symbols';

  const headers = new Headers();
  headers.append('apikey', process.env.API_KEY);

  const response = await fetch(url, { method: 'GET', headers });

  const parsedResponse: IFetchCurrenciesResponse = await response.json();

  if (response.status !== SUCCESS_CODE || !parsedResponse.success) {
    return rejectWithValue('There is an error, try again later');
  }

  return parsedResponse.symbols;
});

interface ICurrenciesState {
  status: TLoadingStatus;
  list: Record<string, string> | null;
}

const initialState: ICurrenciesState = {
  status: 'idle',
  list: null,
};

const currenciesSlice = createSlice({
  name: 'symbols',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCurrencies.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

const selectCurrencyObj = (state: RootState) => state.currencies.list;

const selectCurrencyList = createSelector([selectCurrencyObj], (list) => {
  if (!list) {
    return [];
  }

  return Object.entries(list).map(([key, value]) => ({ value: key, caption: value }));
});

export { fetchCurrencies, selectCurrencyList, selectCurrencyObj };

export default currenciesSlice.reducer;
