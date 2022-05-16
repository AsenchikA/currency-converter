import React, { ChangeEvent, FunctionComponent, useCallback, useEffect, useState } from 'react';
import { getTodayDate } from '../../utils/index';
import styles from './rates-date.css';

interface IRatesDateInput {
  value: string;
  onBlur: (value: string) => void;
}

export const RatesDateInput: FunctionComponent<IRatesDateInput> = ({ value, onBlur }) => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    if (value !== currentDate) {
      setCurrentDate(value);
    }
  }, [value]);

  return (
    <input
      className={styles.datepicker}
      type="date"
      max={getTodayDate()}
      value={currentDate}
      onChange={useCallback((event: ChangeEvent<HTMLInputElement>) => setCurrentDate(event.target.value), [])}
      onBlur={useCallback(() => onBlur(currentDate), [currentDate])}
    />
  );
};
