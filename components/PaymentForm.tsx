'use client';

import { useFormState } from 'react-dom';
import { createPayment, editPayment } from '@/lib/actions';
import { PaymentFormProps, PaymentState } from '@/lib/definitions';
import ActionPaymentForm from '@/components/payment/ActionPaymentForm';

const PaymentForm = ({ type, categories, paymentMethods, transaction = undefined }: PaymentFormProps) => {
  const initialFormState: PaymentState = { errors: {}, message: '' };
  const useFormStateFunc = type === 'create' ? createPayment : editPayment;

  const [state, formAction] = useFormState(useFormStateFunc, initialFormState);

  return (
    <ActionPaymentForm
      formAction={formAction}
      state={state}
      categories={categories}
      paymentMethods={paymentMethods}
      transaction={transaction}
    />
  );
};

export default PaymentForm;
