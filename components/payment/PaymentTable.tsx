'use client';

import { TAllTransactions } from '@/lib/definitions';
import { useState } from 'react';
import PaymentModal from '@/components/payment/PaymentModal';
import PaymentTableList from '@/components/payment/PaymentTableList';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useRef } from 'react';

const PaymentTable = ({ transactions }: { transactions: TAllTransactions[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TAllTransactions | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (idx: number) => {
    setIsOpen(prev => !prev);
    setSelectedTransaction(transactions[idx]);
  };

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
          <PaymentModal
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

export default PaymentTable;
