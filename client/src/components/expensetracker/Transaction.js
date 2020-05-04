import React, { useContext } from 'react';
import { ExpenseContext } from '../../context/ExpenseState';
import { numberWithCommas } from '../../utils/format';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(ExpenseContext);

  const sign = transaction.amount < 0 ? '-' : '+';
  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}{' '}
      <span>
        {sign}${numberWithCommas(Math.abs(transaction.amount))}
      </span>
      <button
        onClick={() => deleteTransaction(transaction._id)}
        className="delete-btn">
        x
      </button>
    </li>
  );
};
