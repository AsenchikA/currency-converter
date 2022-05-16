import { CurrencySelect } from '@components/currency-select/currency-select';
import { selectBaseCurrency, selectSortedCurrencyRates } from '@store/selectors';
import { formatMoney } from '@utils/index';
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './currency-converter.css';

interface ICurrencyConverterProps {
  className?: string;
}

export const CurrencyConverter: FunctionComponent<ICurrencyConverterProps> = ({ className }) => {
  const baseCurrency = useSelector(selectBaseCurrency);
  const rates = useSelector(selectSortedCurrencyRates);

  const [sourceAmount, setSourceAmount] = useState(1);
  const [resultAmount, setResultAmount] = useState(1);
  const [resultCurrency, setResultCurrency] = useState('EUR');

  useEffect(() => {
    convertSum();
  }, [sourceAmount, resultCurrency]);

  const convertSum = () => {
    if (rates === null) {
      return;
    }

    if (baseCurrency === resultCurrency) {
      setResultAmount(sourceAmount);
      return;
    }

    const currencyRate = rates[resultCurrency];
    setResultAmount(currencyRate * sourceAmount);
  };

  const handleSourceAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSourceAmount(Number(event.target.value));
  };

  const handleCurrencyChange = (value: string) => {
    setResultCurrency(value);
  };

  return (
    <div className={className}>
      <div className={styles['currency-converter']}>
        <span className={styles['currency-converter__text']}>Amount</span>
        <input
          className={styles['currency-converter__source-amount']}
          placeholder="amount"
          type="number"
          value={sourceAmount}
          onChange={handleSourceAmountChange}
        />
        <span className={styles['currency-converter__text']}>to</span>
        <CurrencySelect
          className={styles['currency-converter__result-currency']}
          value={resultCurrency}
          onChange={handleCurrencyChange}
        />
      </div>
      <span className={styles['currency-converter__base-currency']}>{`${formatMoney(
        sourceAmount
      )} ${baseCurrency} = ${formatMoney(resultAmount)} ${resultCurrency}`}</span>
    </div>
  );
};
