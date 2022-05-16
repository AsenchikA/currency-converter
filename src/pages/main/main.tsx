import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CurrencyTable } from '@components/currency-table/currency-table';
import { getLatestRates, setBaseCurrency, setDate } from '@store/action-creators/currency-table';
import { TDispatch } from '@models/index';
import { CurrencySelect } from '@components/currency-select/currency-select';
import { useSelector } from 'react-redux';
import { selectBaseCurrency, selectCurrentDate } from '@store/selectors';
import styles from './main.css';
import { RatesDateInput } from '@components/rates-date/rates-date';
import { CurrencyConverter } from '@components/currency-converter/currency-converter';

export const MainPage: FunctionComponent = () => {
  const dispatch = useDispatch<TDispatch>();

  const baseCurrency = useSelector(selectBaseCurrency);
  const currentDate = useSelector(selectCurrentDate);

  useEffect(() => {
    dispatch(getLatestRates());
  }, []);

  return (
    <div className={styles['app-container']}>
      <h1 className={styles['app-container__title']}>Currency converter</h1>
      <main>
        <div className={styles['base-currency-container']}>
          <span className={styles['base-currency-container__caption']}>Base Currency</span>
          <CurrencySelect value={baseCurrency} onChange={useCallback((base) => dispatch(setBaseCurrency(base)), [])} />
        </div>
        <CurrencyConverter className={styles['app-container__currency-converter']} />
        <div className={styles['date-container']}>
          <span className={styles['base-currency-container__caption']}>Table Date</span>
          <RatesDateInput value={currentDate} onBlur={useCallback((date) => dispatch(setDate(date)), [])} />
        </div>
        <CurrencyTable containerClassName={styles['app-container__table']} />
      </main>
    </div>
  );
};
