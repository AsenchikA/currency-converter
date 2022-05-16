import { IGetLatestResponse } from '@models/index';
import { api } from './index';

class CurrencyTableApi {
  public getLatestRates = (baseCurrency: string) => {
    return api.get<IGetLatestResponse>(`/latest?from=${baseCurrency}`);
  };

  public getRatesByDate = (date: string) => {
    return api.get<IGetLatestResponse>(`/${date}`);
  };

  public convertSum = (amount: number, baseCurrency: string, currency: string) => {
    return api.get<IGetLatestResponse>(`/latest?amount=${amount}&from=${baseCurrency}&to=${currency}`);
  };
}

export const currencyTableApi = new CurrencyTableApi();
