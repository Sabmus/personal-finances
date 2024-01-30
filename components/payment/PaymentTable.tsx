'use client';

import { toCLP } from '@/lib/currencyFormat';
import { Eye, Trash2, SquarePen } from 'lucide-react';
import { TAllTransactions } from '@/lib/definitions';
import { useState } from 'react';
import PaymentModal from '@/components/payment/PaymentModal';
import Link from 'next/link';
import DeletePayment from '@/components/payment/DeletePayment';

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
              <tr
                key={transaction.id}
                className="border-b bg-surface-foreground border-surface hover:bg-accent-darker hover:border-accent-darker"
              >
                <td className="table-td">
                  <button onClick={() => handleButtonClick(idx)}>
                    <Eye size={20} className="text-accent hover:text-accent-hover" />
                  </button>
                </td>
                <th scope="row" className="table-td font-medium whitespace-nowrap">
                  {transaction.category}
                </th>
                <td className="table-td">{transaction.paymentMethod}</td>
                <td className="table-td">{toCLP(transaction.amount)}</td>
                <td className="table-td">{transaction.instalmentQuantity}</td>
                <td className="table-td">{toCLP(transaction.instalmentAmount ?? 0)}</td>
                <td className="table-td">{transaction.createdAt.toDateString()}</td>
                <td className="table-td">
                  <div className="flex justify-between items-center">
                    <span>
                      <Link href={`/dashboard/payment/${transaction.id}/edit`}>
                        <SquarePen size={22} className="" />
                      </Link>
                    </span>
                    <span>
                      <DeletePayment id={transaction.id} />
                    </span>
                  </div>
                </td>
              </tr>
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
