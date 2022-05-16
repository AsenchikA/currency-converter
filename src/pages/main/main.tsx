import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { CurrencyTable } from '@components/currency-table/currency-table';
import { getLatestRates, setBaseCurrency, setDate } from '@store/action-creators/currency-table';
import { IRootState } from '@models/index';
import { CurrencySelect } from '@components/currency-select/currency-select';
import { useSelector } from 'react-redux';
import { selectBaseCurrency, selectCurrentDate } from '@store/selectors';
import styles from './main.css';
import { RatesDateInput } from '@components/rates-date/rates-date';

export const MainPage: FunctionComponent = () => {
  const dispatch = useDispatch<ThunkDispatch<IRootState, any, AnyAction>>();
  const baseCurrency = useSelector(selectBaseCurrency);
  const currentDate = useSelector(selectCurrentDate);

  useEffect(() => {
    dispatch(getLatestRates());
  }, []);

  return (
    <div className={styles['app-container']}>
      <h1>Currency converter</h1>
      <main>
        <div className={styles['table-settings']}>
          <div className={styles['base-currency-container']}>
            <span className={styles['base-currency-container__caption']}>Base Currency</span>
            <CurrencySelect
              value={baseCurrency}
              onChange={useCallback((base) => dispatch(setBaseCurrency(base)), [])}
            />
          </div>
          <div className={styles['date-container']}>
            <span className={styles['base-currency-container__caption']}>Date</span>
            <RatesDateInput value={currentDate} onChange={useCallback((date) => dispatch(setDate(date)), [])} />
          </div>
        </div>
        <CurrencyTable containerClassName={styles['app-container__table']} />
      </main>
    </div>
  );
};
