import React from 'react';

import { Converter } from './components/converter';
import { CurrencyTableContainer } from './components/currency-table-container';
import styles from './styles.module.css';

export const MainPage = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Currency converter</h1>
    <Converter className={styles.converter} />
    <CurrencyTableContainer />
  </div>
);
