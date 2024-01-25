import { CreatePaymentForm } from '@/components';

const CreatePayment = () => {
  const categories = [
    {
      id: 'fwnsc6tbvbnghxvu2t4bkzhb',
      name: 'Food',
    },
  ];
  const paymentMethods = [
    {
      id: 'fwnsc6tbvbnghxvu2t4bkzhb',
      name: 'Cash',
    },
  ];

  return (
    <div className="h-full border-test">
      <CreatePaymentForm categories={categories} paymentMethods={paymentMethods} />
    </div>
  );
};

export default CreatePayment;
