import { PaymentForm } from '@/components';
import { getCategories, getPaymentMethods, getTransaction } from '@/lib/data';

const EditPayment = async ({ params }: { params: { id: string } }) => {
  const categories = await getCategories();
  const paymentMethods = await getPaymentMethods();
  const transaction = await getTransaction(params.id);

  return (
    <div className="h-full">
      <PaymentForm type="edit" categories={categories} paymentMethods={paymentMethods} transaction={transaction} />
    </div>
  );
};

export default EditPayment;
