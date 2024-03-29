'use client';

import { TAllTransactions } from '@/lib/definitions';
import { useState } from 'react';
import { TransactionModal, TransactionTableList } from '@/components/transaction';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useRef } from 'react';
import useCloseOnEscKey from '@/hooks/useCloseOnEscKey';

const TransactionTable = ({ transactions }: { transactions: TAllTransactions[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TAllTransactions | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (idx: number) => {
    setIsOpen(prev => !prev);
    setSelectedTransaction(transactions[idx]);
  };

  useCloseOnEscKey(() => {
    setIsOpen(false);
    //document.getElementById(`${idx}`)?.blur();
  });

  useOnClickOutside(divRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="relative h-full">
      <table className={`table-main ${isOpen ? 'table-main-blur' : null}`}>
        <thead className="table-head">
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
              <TransactionTableList
                key={transaction.id}
                transaction={transaction}
                handleButtonClick={() => handleButtonClick(idx)}
              />
            ))}
        </tbody>
      </table>
      {selectedTransaction && (
        <div className={`absolute w-1/2 top-20 right-0 left-0 mx-auto ${isOpen ? 'block' : 'hidden'}`}>
          <TransactionModal
            divRef={divRef}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedTransaction={selectedTransaction}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
