import React, { useEffect } from 'react';

import { useAppDispatch } from '@store/hooks';
import { fetchCurrencies } from '@store/slices/currencies';

import { Converter } from './components/converter';
import { CurrencyTableContainer } from './components/currency-table-container';
import styles from './styles.module.css';

export const MainPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  return (
    <div className={styles.container}>
      <Converter className={styles.converter} />
      <CurrencyTableContainer />
    </div>
  );
};
