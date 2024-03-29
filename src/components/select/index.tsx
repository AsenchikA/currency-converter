import React, { FC, SelectHTMLAttributes } from 'react';

import classNames from 'classNames';

import { Label } from '@components/label';

import styles from './styles.module.css';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  name: string;
  optionList: { value: string; caption: string }[];
  containerClassName?: string;
  label?: string;
}

export const Select: FC<IProps> = ({ className, containerClassName, id, label, name, optionList, ...props }) => (
  <div className={classNames(styles.container, containerClassName)}>
    {label && id && <Label className={styles.label} htmlFor={id} text={label} />}
    <select className={classNames(styles.select, className)} id={id} {...props}>
      <option value="" hidden>
        Select value
      </option>
      {optionList.map(({ value, caption }) => (
        <option key={value} value={value}>
          {caption}
        </option>
      ))}
    </select>
  </div>
);
