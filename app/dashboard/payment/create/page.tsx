import { CreatePaymentForm } from '@/components';

const CreatePayment = () => {
  const categories = ['category 1', 'category 2', 'category 3'];
  const paymentMethods = ['payment 1', 'payment 2', 'payment 3'];

  return (
    <div className="h-full border-test">
      <CreatePaymentForm categories={categories} paymentMethods={paymentMethods} />
    </div>
  );
};

export default CreatePayment;
