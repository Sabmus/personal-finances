'use client';

import { useFormState } from 'react-dom';
import { createTransaction, editTransaction } from '@/lib/actions/transactionActions';
import { PaymentFormProps, PaymentState } from '@/lib/definitions';
import ActionPaymentForm from '@/components/payment/ActionPaymentForm';

const PaymentForm = ({ type, categories, paymentMethods, transaction = undefined }: PaymentFormProps) => {
  const initialFormState: PaymentState = { errors: {}, message: '' };

  const editTransactionWithId = editTransaction.bind(null, transaction?.id || '');
  const useFormStateFunc = type === 'create' ? createTransaction : editTransactionWithId;

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
