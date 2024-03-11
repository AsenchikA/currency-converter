import React, { FC, InputHTMLAttributes } from 'react';

import classNames from 'classNames';

import styles from './styles.module.css';

export const DateInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input {...props} className={classNames(styles.input, className)} type="date" />
);
