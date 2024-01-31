'use client';

import { useFormState } from 'react-dom';
import { TCreateFormProps, CategoryState, PaymentMethodState } from '@/lib/definitions';

const CreateForm = ({ action }: TCreateFormProps) => {
  const initialState: CategoryState | PaymentMethodState = { errors: {}, message: '' };
  const [state, formAction] = useFormState(action, initialState);

  return (
    <div className="border-test w-1/3 h-40 mt-10 bg-background mx-auto p-4 flex flex-col items-center">
      <form action={formAction} className="flex flex-col items-center gap-4">
        <input type="text" id="name" name="name" placeholder="Type a name..." />
        <button className="btn">Create</button>
      </form>
      {state && state.errors && state.errors.name && (
        <div id="name-error" className="text-red-500">
          {state.errors.name}
        </div>
      )}
      {state && state.message && <div className="text-green-500">{state.message}</div>}
    </div>
  );
};

export default CreateForm;
