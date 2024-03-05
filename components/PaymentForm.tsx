'use client';

import { useFormState } from 'react-dom';
import { createTransaction, editTransaction } from '@/lib/actions/transactionActions';
import { TransactionFormProps, TransactiontState } from '@/lib/definitions';
import { TransactionForm } from '@/components/transaction';

const PaymentForm = ({ type, categories, paymentMethods, transaction = undefined }: TransactionFormProps) => {
  const initialFormState: TransactiontState = { errors: {}, message: '' };

  const editTransactionWithId = editTransaction.bind(null, transaction?.id || '');
  const useFormStateFunc = type === 'create' ? createTransaction : editTransactionWithId;

  const [state, formAction] = useFormState(useFormStateFunc, initialFormState);

  return (
    <TransactionForm
      formAction={formAction}
      state={state}
      categories={categories}
      paymentMethods={paymentMethods}
      transaction={transaction}
    />
  );
};

export default PaymentForm;
