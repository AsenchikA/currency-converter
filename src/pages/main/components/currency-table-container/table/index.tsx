import React, { FC, useCallback, useMemo, useState } from 'react';

import classNames from 'classNames';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchHistoricalRates, selectHistoricalRates } from '@store/slices/historical-rates';
import { getIsDateValid, getNumberWithSpaces } from '@utils/index';

import styles from './styles.module.css';

interface IProps {
  date: string;
}

export const CurrencyTable: FC<IProps> = ({ date }) => {
  const [sortField, setSortField] = useState<'currency' | 'amount'>();
  const [isSortAscending, setIsSortAscending] = useState(true);

  const dispatch = useAppDispatch();

  const rates = useAppSelector(selectHistoricalRates);

  const sortedRates = useMemo(() => {
    const sortFactor = isSortAscending ? 1 : -1;

    switch (sortField) {
      case 'amount':
        return [...rates].sort((a, b) => (a.value > b.value ? sortFactor : sortFactor * -1));
      case 'currency':
      default:
        return [...rates].sort((a, b) => (a.caption > b.caption ? sortFactor : sortFactor * -1));
    }
  }, [isSortAscending, sortField, rates]);

  const onCurrencyClick = useCallback(
    (currency: string) => {
      if (!getIsDateValid(date)) {
        return;
      }

      dispatch(fetchHistoricalRates({ date, base: currency }));
    },
    [date]
  );

  const onCurrencyHeaderClick = useCallback(() => {
    if (sortField !== 'currency') {
      setSortField('currency');
      setIsSortAscending(true);
      return;
    }

    setIsSortAscending((state) => !state);
  }, [sortField]);

  const onAmountHeaderClick = useCallback(() => {
    if (sortField !== 'amount') {
      setSortField('amount');
      setIsSortAscending(true);
      return;
    }

    setIsSortAscending((state) => !state);
  }, [sortField]);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles['table-head']}>
          <tr>
            <th
              className={classNames(styles.cell, styles['header-cell'], {
                [styles['cell-sorted']]: sortField === 'currency',
                [styles['cell-sorted-ascending']]: sortField === 'currency' && isSortAscending,
                [styles['cell-sorted-descending']]: sortField === 'currency' && !isSortAscending,
              })}
              onClick={onCurrencyHeaderClick}
            >
              Currency
            </th>
            <th
              className={classNames(styles.cell, styles['header-cell'], {
                [styles['cell-sorted']]: sortField === 'amount',
                [styles['cell-sorted-ascending']]: sortField === 'amount' && isSortAscending,
                [styles['cell-sorted-descending']]: sortField === 'amount' && !isSortAscending,
              })}
              onClick={onAmountHeaderClick}
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRates.map((rate) => (
            <tr key={rate.name} className={styles.row}>
              <td
                className={classNames(styles.cell, styles['currency-cell'])}
                onClick={() => onCurrencyClick(rate.name)}
              >
                {rate.caption} ({rate.name})
              </td>
              <td className={styles.cell}>{getNumberWithSpaces(rate.value.toFixed(2))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
