import React, { ChangeEvent, FunctionComponent, useCallback, useEffect, useState } from 'react';
import { getTodayDate } from '../../utils/index';

interface IRatesDateInput {
  value: string;
  onChange: (value: string) => void;
}

export const RatesDateInput: FunctionComponent<IRatesDateInput> = ({ value, onChange }) => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    if (value !== currentDate) {
      setCurrentDate(value);
    }
  }, [value]);

  return (
    <input
      type="date"
      max={getTodayDate()}
      value={currentDate}
      onChange={useCallback((event: ChangeEvent<HTMLInputElement>) => setCurrentDate(event.target.value), [])}
      onBlur={useCallback(() => onChange(currentDate), [currentDate])}
    />
  );
};
