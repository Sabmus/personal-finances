'use client';
import { ChangeEvent, useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { IUpdateConfigurationItem, CategoryState, PaymentMethodState } from '@/lib/definitions';
import { SubmitButton } from '@/components/ui';
import toast from 'react-hot-toast';

const UpdateConfigurationItem = ({ id, inputValue, action, handleShowOptions }: IUpdateConfigurationItem) => {
  const editWithId = action.bind(null, id);

  const initialState: CategoryState | PaymentMethodState = { errors: {}, message: '' };
  const [state, formAction] = useFormState(editWithId, initialState);

  const [item, setItem] = useState(inputValue);

  useEffect(() => {
    if (state.errors === undefined) {
      handleShowOptions();
      toast.success(state.message || 'Updated Successfully');
    }
    if (state.errors?.name) {
      state.errors.name.forEach((error: string) => {
        toast.error(error);
      });
    }
  }, [state, handleShowOptions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  };

  return (
    <form action={formAction} className="w-full flex justify-between">
      <input type="text" id="name" name="name" value={item} onChange={e => handleChange(e)} className="w-2/3" />
      <SubmitButton btnName="Save" className="mr-4" />
    </form>
  );
};

export default UpdateConfigurationItem;
