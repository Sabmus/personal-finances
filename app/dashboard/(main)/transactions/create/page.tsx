import { PaymentForm } from '@/components';
import { getCategories, getPaymentMethods } from '@/lib/data';

const CreatePayment = async () => {
  const categories = await getCategories();
  const paymentMethods = await getPaymentMethods();

  return (
    <div className="h-full">
      <PaymentForm type="create" categories={categories} paymentMethods={paymentMethods} />
    </div>
  );
};

export default CreatePayment;
