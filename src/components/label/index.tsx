import React, { FC, LabelHTMLAttributes } from 'react';

import classNames from 'classNames';

import styles from './styles.module.css';

interface IProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  text: string;
}

export const Label: FC<IProps> = ({ className, htmlFor, text, ...props }) => (
  <label className={classNames(styles.label, className)} htmlFor={htmlFor} {...props}>
    {text}
  </label>
);
