'use client';

import { toCLP } from '@/lib/currencyFormat';
import { Eye } from 'lucide-react';
import { TAllTransactions } from '@/lib/definitions';
import { useState } from 'react';

const PaymentTable = ({ transactions }: { transactions: TAllTransactions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="h-full">
      <table className="w-full text-sm table-auto text-left">
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
          </tr>
        </thead>
        <tbody>
          {transactions &&
            transactions.map(transaction => (
              <tr
                key={transaction.id}
                className="border-b bg-surface-foreground border-surface hover:bg-accent-darker hover:border-accent-darker"
              >
                <td className="table-td">
                  <button onClick={handleButtonClick}>
                    <Eye size={20} />
                  </button>
                </td>
                <th scope="row" className="table-td font-medium whitespace-nowrap">
                  {transaction.category}
                </th>
                <td className="table-td">{transaction.paymentMethod}</td>
                <td className="table-td">{toCLP(transaction.amount)}</td>
                <td className="table-td">{transaction.instalmentQuantity}</td>
                <td className="table-td">{toCLP(transaction.instalmentAmount ?? 0)}</td>
                <td className="table-td">{transaction.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* modal */}
      <div id="paymentDetails" tabIndex={-1} aria-hidden={isOpen} className={`${isOpen ? 'block' : 'hidden'}`}>
        <span>hola!</span>
      </div>
    </div>
  );
};

export default PaymentTable;
