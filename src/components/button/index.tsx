import React, { ButtonHTMLAttributes, FC } from 'react';

import styles from './styles.module.css';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const Button: FC<IProps> = ({ text, ...props }) => (
  <button className={styles.button} type="button" {...props}>
    {text}
  </button>
);
