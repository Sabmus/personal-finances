import Link from 'next/link';
import { DashboardTitle } from '@/components/ui';
import { getAllTransactions } from '@/lib/data';
import { TransactionCard } from '@/components/transaction';

import PaymentTable from '@/components/payment/PaymentTable';

const Transaction = async () => {
  // const transactions = await getAllTransactions();
  const transactions = [
    {
      id: 'idi669kld1oadtrcjzxrkbbb',
      category: 'Supermercado',
      categoryId: 'cpi9jqiex5hfkm95ie4fi1my',
      paymentMethod: 'debito',
      paymentMethodId: 'mtnjez2v2g44ekslorboqyhu',
      amount: 10000,
      hasInstalment: true,
      instalmentQuantity: 2,
      instalmentAmount: 5000,
      notes: 'hola que hace',
      createdAt: new Date('2024-02-23T14:27:20.810Z'),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <DashboardTitle />
        <Link href="/dashboard/transactions/create" className="btn-outline right-0">
          Add Transaction
        </Link>
      </div>
      <div className="flex flex-col gap-1 overflow-y-scroll">
        {transactions &&
          transactions.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} />)}
      </div>

      {/* <PaymentTable transactions={transactions} /> */}
    </div>
  );
};

export default Transaction;
