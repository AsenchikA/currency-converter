import React, { FC, InputHTMLAttributes } from 'react';

import classNames from 'classNames';

import { Label } from '@components/label';

import styles from './styles.module.css';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  containerClassName?: string;
}

export const NumberInput: FC<IProps> = ({ className, containerClassName, id, label, ...props }) => (
  <div className={classNames(styles.container, containerClassName)}>
    {label && <Label className={styles.label} htmlFor={id} text={label} />}
    <input className={classNames(styles.input, className)} type="number" id={id} {...props} />
  </div>
);
