import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsCurrencyTableLoading,
  selectSortColumn,
  selectSortedCurrencyRates,
  selectSortOrder,
} from '@store/selectors';
import classNames from 'classnames';
import styles from './currency-table.css';
import { SortingIcon } from '@components/sorting-icon/sorting-icon';
import { Loader } from '@components/loader/loader';
import { ESortOrder, ISortColumnName, TDispatch } from '@models/index';
import { setSortState } from '@store/action-creators/currency-table';
import { formatMoney } from '@utils/index';

interface ICurrencyTableProps {
  containerClassName?: string;
}

export const CurrencyTable: FunctionComponent<ICurrencyTableProps> = ({ containerClassName }) => {
  const rates = useSelector(selectSortedCurrencyRates);
  const isLoading = useSelector(selectIsCurrencyTableLoading);
  const sortColumn = useSelector(selectSortColumn);
  const sortOrder = useSelector(selectSortOrder);

  const dispatch = useDispatch<TDispatch>();

  const handleSortIconClick = (newSortColumn: ISortColumnName) => {
    if (newSortColumn !== sortColumn) {
      dispatch(setSortState({ columnName: newSortColumn, order: ESortOrder.ASCENDING }));
      return;
    }

    let newSortOrder: ESortOrder;
    switch (sortOrder) {
      case ESortOrder.UNDEFINED:
        newSortOrder = ESortOrder.ASCENDING;
        break;
      case ESortOrder.ASCENDING:
        newSortOrder = ESortOrder.DESCENDING;
        break;
      case ESortOrder.DESCENDING:
      default:
        newSortOrder = ESortOrder.UNDEFINED;
        break;
    }

    dispatch(setSortState({ columnName: sortColumn, order: newSortOrder }));
  };

  const renderLoader = () => {
    if (!isLoading) {
      return null;
    }

    return (
      <div className={styles['table-overlay']}>
        <Loader className={styles['table-loader']} />
      </div>
    );
  };

  const renderTable = () => {
    if (rates === null) {
      return null;
    }

    return (
      <table className={styles.table}>
        <thead className={styles['table__header']}>
          <tr>
            <td>
              <div className={styles['table__header-cell-inner']}>
                Currency
                <SortingIcon
                  className={styles['table__header-sort-icon']}
                  sortState={(sortColumn === 'currency' && sortOrder) || ESortOrder.UNDEFINED}
                  onClick={() => handleSortIconClick('currency')}
                />
              </div>
            </td>
            <td>
              <div className={styles['table__header-cell-inner']}>
                Price
                <SortingIcon
                  className={styles['table__header-sort-icon']}
                  sortState={(sortColumn === 'price' && sortOrder) || ESortOrder.UNDEFINED}
                  onClick={() => handleSortIconClick('price')}
                />
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rates).map((entry) => (
            <tr key={entry[0]}>
              <td data-id={entry[0]}>{entry[0]}</td>
              <td>{formatMoney(entry[1])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={classNames(styles['table-container'], containerClassName)}>
      {renderLoader()}
      {renderTable()}
    </div>
  );
};
