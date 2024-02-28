import React, { FC, useMemo } from 'react';

import classNames from 'classNames';

import { DateInput } from '@components/date-input';
import { Select } from '@components/select';
import { getCurrentDate } from '@utils/index';

import styles from './styles.module.css';

interface IProps {
  className?: string;
}

export const CurrencyTableControlsContainer: FC<IProps> = ({ className }) => {
  const currentDate = useMemo(() => getCurrentDate(), []);

  return (
    <div className={classNames(className, styles.container)}>
      <Select className={styles['currency-select']} id="currency-select" optionList={[]} />
      <DateInput max={currentDate} />
    </div>
  );
};
