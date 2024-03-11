import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { SUCCESS_CODE } from '@constants/index';
import { TLoadingStatus } from '@custom-types/index';
import { RootState } from '@store/index';

interface IConvertResponse {
  date: string;
  historical: string;
  info: {
    rate: number;
    timestamp: number;
  };
  query: {
    amount: number;
    from: string;
    to: string;
  };
  result: number;
  success: boolean;
}

const fetchConverterResult = createAsyncThunk<IConvertResponse, { from: string; to: string; amount: string }>(
  'converter/getResult',
  async ({ from, to, amount }, { rejectWithValue }) => {
    if (!process.env.API_KEY) {
      return rejectWithValue('No API key provided');
    }

    const url = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`;

    const headers = new Headers();
    headers.append('apikey', process.env.API_KEY);

    const response = await fetch(url, { method: 'GET', headers });

    const parsedResponse: IConvertResponse = await response.json();

    if (response.status !== SUCCESS_CODE || !parsedResponse.success) {
      return rejectWithValue('There is an error, try again later');
    }

    return parsedResponse;
  }
);

interface IConverterState {
  amount: number;
  from: string;
  status: TLoadingStatus;
  to: string;
  result: number;
}

const initialState: IConverterState = {
  amount: 0,
  from: '',
  status: 'idle',
  to: '',
  result: 0,
};

const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConverterResult.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConverterResult.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.amount = action.payload.query.amount;
        state.from = action.payload.query.from;
        state.to = action.payload.query.to;
        state.result = action.payload.result;
      })
      .addCase(fetchConverterResult.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

const selectConverterResult = (state: RootState) => state.converter;

export { fetchConverterResult, selectConverterResult };

export default converterSlice.reducer;
