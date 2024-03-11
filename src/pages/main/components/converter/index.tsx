import React, { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';

import classNames from 'classNames';

import { Button } from '@components/button';
import { Loader } from '@components/loader';
import { NumberInput } from '@components/number-input';
import { Select } from '@components/select';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchConverterResult, selectConverterResult } from '@store/slices/converter';
import { selectCurrencyList } from '@store/slices/currencies';
import { getNumberWithSpaces } from '@utils/index';

import styles from './styles.module.css';

interface IProps {
  className?: string;
}

export const Converter: FC<IProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  const currencyList = useAppSelector(selectCurrencyList);
  const converterResultModel = useAppSelector(selectConverterResult);

  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [isValidationActive, setValidationActivity] = useState(false);

  const handleAmountChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  }, []);

  const handleFromCurrencyChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(event.target.value);
  }, []);

  const handleToCurrencyChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(event.target.value);
  }, []);

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (fromCurrency === '' || toCurrency === '' || Number(amount) < 0) {
        setValidationActivity(true);
        return;
      }

      dispatch(fetchConverterResult({ from: fromCurrency, to: toCurrency, amount }));
    },
    [fromCurrency, toCurrency, amount]
  );

  return (
    <>
      <h2 className={styles.title}>Currency converter</h2>
      <div className={classNames(styles.container, className)}>
        <form className={styles.form} onSubmit={onSubmit}>
          <NumberInput
            containerClassName={styles['converter-item']}
            className={styles['converter-item-field']}
            label="Amount"
            id="converter-amount"
            value={amount}
            onChange={handleAmountChange}
            min={0}
            required={isValidationActive}
          />
          <Select
            defaultValue={undefined}
            containerClassName={styles['converter-item']}
            className={styles['converter-item-field']}
            label="From"
            id="converter-from-currency"
            name="converter-from-currency"
            value={fromCurrency}
            optionList={currencyList}
            onChange={handleFromCurrencyChange}
            required={isValidationActive}
          />
          <Select
            defaultValue={undefined}
            containerClassName={styles['converter-item']}
            className={styles['converter-item-field']}
            label="To"
            id="converter-to-currency"
            name="converter-to-currency"
            value={toCurrency}
            optionList={currencyList}
            onChange={handleToCurrencyChange}
            required={isValidationActive}
          />
          <Button text="Convert" type="submit" />
        </form>
        {converterResultModel.status === 'loading' && <Loader className={styles.loader} />}
        {converterResultModel.status === 'succeeded' && (
          <div className={styles['result-section']}>
            <span>
              {getNumberWithSpaces(converterResultModel.amount.toFixed(2))}&nbsp;{converterResultModel.from}
            </span>
            <span>=</span>
            <span>
              {getNumberWithSpaces(converterResultModel.result.toFixed(2))}&nbsp;{converterResultModel.to}
            </span>
          </div>
        )}
      </div>
    </>
  );
};
