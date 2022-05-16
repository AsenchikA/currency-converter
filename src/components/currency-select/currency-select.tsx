import { selectCurrencyList } from '@store/selectors';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import styles from './currency-select.css';

interface ICurrencySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const CurrencySelect: FunctionComponent<ICurrencySelectProps> = ({ value, onChange }) => {
  const currencyList = useSelector(selectCurrencyList);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select className={styles.select} value={value} onChange={handleChange}>
      {currencyList.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
      <option value={value}>{value}</option>
    </select>
  );
};
