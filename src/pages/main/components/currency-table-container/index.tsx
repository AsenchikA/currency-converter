import React, { FC, useState } from 'react';

import { useAppSelector } from '@store/hooks';
import { selectHistoricalRatesStatus } from '@store/slices/historical-rates';
import { getCurrentDate } from '@utils/index';

import { CurrencyTableControlsContainer } from './controls-container';
import styles from './styles.module.css';
import { CurrencyTable } from './table';

export const CurrencyTableContainer: FC = () => {
  const loadingStatus = useAppSelector(selectHistoricalRatesStatus);

  const [date, setDate] = useState(getCurrentDate());

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Historical Rates Table</h2>
      <CurrencyTableControlsContainer
        className={styles['controls-container']}
        date={date}
        loadingStatus={loadingStatus}
        onDateChange={setDate}
      />
      {loadingStatus === 'succeeded' && <CurrencyTable date={date} />}
    </div>
  );
};
