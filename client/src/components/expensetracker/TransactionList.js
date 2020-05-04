import React, { useContext, useEffect } from 'react';
import { ExpenseContext } from '../../context/ExpenseState';
import { Transaction } from './Transaction';

export const TransactionList = () => {
  const { transactions, getTransactions } = useContext(ExpenseContext);

  useEffect(() => {
    getTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction
            key={transaction._id}
            transaction={transaction}></Transaction>
        ))}
      </ul>
    </>
  );
};
