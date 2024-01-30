import DeletePaymentForm from '@/components/payment/DeletePaymentForm';

const DeletePayment = ({ id }: { id: string }) => {
  return <DeletePaymentForm id={id} />;
};

export default DeletePayment;
