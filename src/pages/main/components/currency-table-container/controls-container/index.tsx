import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

import classNames from 'classNames';

import { Button } from '@components/button';
import { DateInput } from '@components/date-input';
import { Select } from '@components/select';
import { TLoadingStatus } from '@custom-types/index';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectCurrencyList } from '@store/slices/currencies';
import { fetchHistoricalRates, selectHistoricalRatesBaseCurrency } from '@store/slices/historical-rates';
import { getCurrentDate, getIsDateValid } from '@utils/index';

import styles from './styles.module.css';

interface IProps {
  date: string;
  loadingStatus: TLoadingStatus;
  onDateChange: (date: string) => void;
  className?: string;
}

export const CurrencyTableControlsContainer: FC<IProps> = ({ className, date, loadingStatus, onDateChange }) => {
  const currencyList = useAppSelector(selectCurrencyList);
  const baseCurrency = useAppSelector(selectHistoricalRatesBaseCurrency);
  const dispatch = useAppDispatch();

  const [currency, setCurrency] = useState<string>('');
  const [isValidationActive, setValidationActivity] = useState(false);

  const currentDate = useMemo(() => getCurrentDate(), []);

  const handleCurrencyChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  }, []);

  const handleDateChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onDateChange(event.target.value);
    },
    [onDateChange]
  );

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (currency === '' || !getIsDateValid(date)) {
        setValidationActivity(true);
        return;
      }

      dispatch(fetchHistoricalRates({ date, base: currency }));
    },
    [date, currency]
  );

  useEffect(() => {
    setCurrency(baseCurrency);
  }, [baseCurrency]);

  return (
    <div className={classNames(className, styles.container)}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Select
          className={styles['currency-select']}
          id="currency-select"
          name="currency-select"
          value={currency}
          optionList={currencyList}
          onChange={handleCurrencyChange}
          required={isValidationActive}
        />
        <DateInput max={currentDate} required={isValidationActive} value={date} onChange={handleDateChange} />
        <Button text="Confirm" type="submit" disabled={loadingStatus === 'loading'} />
      </form>
    </div>
  );
};
