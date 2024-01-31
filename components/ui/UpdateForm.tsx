'use client';

import { TUpdateFormProps, CategoryState, PaymentMethodState } from '@/lib/definitions';
import { useFormState } from 'react-dom';

const UpdateForm = ({ selectedItem, action }: TUpdateFormProps) => {
  const initialState: CategoryState | PaymentMethodState = { errors: {}, message: '' };
  const editWithId = action.bind(null, selectedItem.id);

  const [state, formAction] = useFormState(editWithId, initialState);

  return (
    <div>
      <form className="flex flex-col gap-3 items-center mb-1" action={formAction}>
        <input
          type="text"
          name="name"
          id="name"
          className="w-full p-2 border border-test"
          defaultValue={selectedItem.name}
          aria-describedby="name-error"
        />
        <button className="btn w-1/2">Save</button>
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

export default UpdateForm;
