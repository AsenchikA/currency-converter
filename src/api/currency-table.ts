import { IGetLatestResponse } from '@models/index';
import { api } from './index';

class CurrencyTableApi {
  public getLatestRates = (baseCurrency: string) => {
    return api.get<IGetLatestResponse>(`/latest?from=${baseCurrency}`);
  };

  public getRatesByDate = (date: string) => {
    return api.get<IGetLatestResponse>(`/${date}`);
  };
}

export const currencyTableApi = new CurrencyTableApi();
