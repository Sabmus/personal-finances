import { Trash2 } from 'lucide-react';
import { deletePayment } from '@/lib/actions/paymentActions';

const DeletePaymentForm = ({ id }: { id: string }) => {
  const deletePaymentWithId = deletePayment.bind(null, id);

  return (
    <form action={deletePaymentWithId}>
      <button>
        <Trash2 size={22} className="text-error hover:text-error-hover" />
      </button>
    </form>
  );
};

export default DeletePaymentForm;
