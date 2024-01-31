import { MainTable } from '@/components/ui';
import Link from 'next/link';
import { getPaymentMethods } from '@/lib/data';
import { editPaymentMethod, deletePaymentMethod } from '@/lib/actions';

const PaymentMethods = async () => {
  const paymentMethods = await getPaymentMethods();

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="text-right">
        <Link href="/dashboard/paymentMethods/create" className="btn-outline right-0">
          Add Payment Method
        </Link>
      </div>

      <div className="h-full">
        <MainTable
          colName={'Payment Methods'}
          data={paymentMethods}
          action={editPaymentMethod}
          deleteAction={deletePaymentMethod}
        />
      </div>
    </div>
  );
};

export default PaymentMethods;
