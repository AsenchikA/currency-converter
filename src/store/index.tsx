import { configureStore } from '@reduxjs/toolkit';

import converterReducer from './slices/converter';
import currenciesReducer from './slices/currencies';
import historicalRatesReducer from './slices/historical-rates';

export const store = configureStore({
  reducer: {
    converter: converterReducer,
    currencies: currenciesReducer,
    historicalRates: historicalRatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
