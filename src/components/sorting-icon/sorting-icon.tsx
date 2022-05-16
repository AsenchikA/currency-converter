import { ESortOrder } from '@models/index';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import styles from './sorting-icon.css';

interface ISortingIconProps {
  sortState: ESortOrder;
  onClick: () => void;
  className?: string;
}

export const SortingIcon: FunctionComponent<ISortingIconProps> = ({ className, sortState, onClick }) => {
  return (
    <div
      className={classNames(
        styles['sorting-icon'],
        className,
        { [styles['sorting-icon--ascending']]: sortState === ESortOrder.ASCENDING },
        { [styles['sorting-icon--descending']]: sortState === ESortOrder.DESCENDING }
      )}
      onClick={onClick}
    />
  );
};
