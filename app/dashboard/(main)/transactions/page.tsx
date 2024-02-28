import Link from 'next/link';
import { getAllTransactions } from '@/lib/data';
import PaymentTable from '@/components/payment/PaymentTable';

const Payment = async () => {
  const transactions = await getAllTransactions();

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="text-right">
        <Link href="/dashboard/transactions/create" className="btn-outline right-0">
          Add Transaction
        </Link>
      </div>

      {/* <PaymentTable transactions={transactions} /> */}
    </div>
  );
};

export default Payment;
