import { CreatePaymentForm } from '@/components';

const CreatePayment = () => {
  const categories = ['item1', 'item2', 'item3'];
  const paymentMethods = ['item1', 'item2', 'item3'];

  return (
    <div className="h-full border-test">
      <CreatePaymentForm categories={categories} paymentMethods={paymentMethods} />
    </div>
  );
};

export default CreatePayment;
