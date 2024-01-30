'use client';

import { TAllTransactions } from '@/lib/definitions';
import { useState, useEffect } from 'react';
import PaymentModal from '@/components/payment/PaymentModal';
import { KEY_CODES } from '@/utils';
import PaymentTableList from '@/components/payment/PaymentTableList';

const PaymentTable = ({ transactions }: { transactions: TAllTransactions[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TAllTransactions | null>(null);

  const handleButtonClick = (idx: number) => {
    setIsOpen(prev => !prev);
    setSelectedTransaction(transactions[idx]);
  };

  return (
    <div className="relative h-full">
      <table className={`w-full text-sm table-auto text-left ${isOpen ? 'blur-sm transition-all duration-200' : null}`}>
        <thead className="text-xs uppercase bg-surface text-foreground">
          <tr>
            <th scope="col" className="table-th">
              view
            </th>
            <th scope="col" className="table-th">
              Category
            </th>
            <th scope="col" className="table-th">
              Payment Method
            </th>
            <th scope="col" className="table-th">
              Amount
            </th>
            <th scope="col" className="table-th">
              Ins. Qty.
            </th>
            <th scope="col" className="table-th">
              Ins. Amount
            </th>
            <th scope="col" className="table-th">
              Created
            </th>
            <th scope="col" className="table-th">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions &&
            transactions.map((transaction, idx) => (
              <PaymentTableList
                key={transaction.id}
                transaction={transaction}
                handleButtonClick={() => handleButtonClick(idx)}
                setIsOpen={() => setIsOpen(false)}
                idx={idx.toString()}
              />
            ))}
        </tbody>
      </table>
      {selectedTransaction && (
        <div className={`absolute w-1/2 top-20 right-0 left-0 mx-auto ${isOpen ? 'block' : 'hidden'}`}>
          <PaymentModal isOpen={isOpen} setIsOpen={setIsOpen} selectedTransaction={selectedTransaction} />
        </div>
      )}
    </div>
  );
};

export default PaymentTable;
