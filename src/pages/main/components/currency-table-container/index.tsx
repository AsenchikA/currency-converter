import React, { FC } from 'react';

import { CurrencyTableControlsContainer } from './controls-container';
import styles from './styles.module.css';
import { CurrencyTable } from './table';

export const CurrencyTableContainer: FC = () => (
  <>
    <CurrencyTableControlsContainer className={styles['controls-container']} />
    <CurrencyTable />
  </>
);
