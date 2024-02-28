import React, { FC } from 'react';

import classNames from 'classNames';

import { Button } from '@components/button';
import { NumberInput } from '@components/number-input';
import { Select } from '@components/select';

import styles from './styles.module.css';

interface IProps {
  className?: string;
}

export const Converter: FC<IProps> = ({ className }) => (
  <div className={classNames(styles.container, className)}>
    <NumberInput
      containerClassName={styles['converter-item']}
      className={styles['converter-item-field']}
      label="Amount"
      id="converter-amount"
    />
    <Select
      containerClassName={styles['converter-item']}
      className={styles['converter-item-field']}
      label="From"
      id="converter-from-currency"
      optionList={[]}
    />
    <Select
      containerClassName={styles['converter-item']}
      className={styles['converter-item-field']}
      label="To"
      id="converter-to-currency"
      optionList={[]}
    />
    <Button text="Convert" />
  </div>
);
