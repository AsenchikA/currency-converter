import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import styles from './loader.css';

interface ILoaderProps {
  className?: string;
}

export const Loader: FunctionComponent<ILoaderProps> = ({ className }) => {
  return <div className={classNames(styles.loader, className)} />;
};
