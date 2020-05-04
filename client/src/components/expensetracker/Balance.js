import React, { useContext } from 'react';
import { ExpenseContext } from '../../context/ExpenseState';
import { numberWithCommas } from '../../utils/format';

export const Balance = () => {
  const { transactions } = useContext(ExpenseContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  return (
    <>
      <h4>Your Balance</h4>
      <h1>${numberWithCommas(total)}</h1>
    </>
  );
};
