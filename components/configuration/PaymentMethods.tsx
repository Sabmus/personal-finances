import { getPaymentMethods } from '@/lib/data';
import { deletePaymentMethod } from '@/lib/actions';
import { DeleteForm } from '@/components/ui';

const PaymentMethods = async ({ searchParams }: { searchParams: Record<string, string> | null | undefined }) => {
  const paymentMethods = await getPaymentMethods();

  return (
    <div className="bg-surface rounded-sm w-1/4 px-4 py-2">
      <div className="flex justify-between items-baseline mb-4">
        <h5>Payment Methods</h5>
        <a href="#">Add</a>
      </div>
      <div>
        <ul>
          {paymentMethods &&
            paymentMethods.map(paymentMethod => (
              <li key={paymentMethod.id} className="flex justify-between border-b border-white">
                <span>{paymentMethod.name}</span>
                <div className="flex">
                  <a href="" className="px-2">
                    Edit
                  </a>
                  <DeleteForm id={paymentMethod.id} deleteAction={deletePaymentMethod} searchParams={searchParams} />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PaymentMethods;
