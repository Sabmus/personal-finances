'use client';

import { CategoryState, PaymentMethodState, ICreateConfigurationItemProps } from '@/lib/definitions';
import { useFormState } from 'react-dom';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { SubmitButton } from '@/components/ui';
import toast from 'react-hot-toast';

const CreateConfigurationItem = ({ action, btnTitle }: ICreateConfigurationItemProps) => {
  const initialState: CategoryState | PaymentMethodState = { errors: {}, message: '' };
  const [state, formAction] = useFormState(action, initialState);

  const [create, setCreate] = useState(false);

  useEffect(() => {
    if (state.errors === undefined) {
      setCreate(false);
      toast.success(state.message || 'Created Successfully');
    }
    if (state.errors?.name) {
      state.errors.name.forEach((error: string) => {
        toast.error(error);
      });
    }
  }, [state]);

  const handleBtnClick = () => {
    setCreate(prev => !prev);
  };

  return (
    <>
      {create ? (
        <div className="configurationItem">
          <form action={formAction} className="flex w-full items-center">
            <input type="text" name="name" id="name" className="px-2 mr-2 w-full" autoFocus />
            <SubmitButton name="Save" />
          </form>
          <span>
            <X size={20} className=" text-red-400 hover:cursor-pointer hover:scale-110" onClick={handleBtnClick} />
          </span>
        </div>
      ) : (
        <div className="flex items-center">
          <button className="btn w-full" onClick={handleBtnClick}>
            {btnTitle}
          </button>
        </div>
      )}
    </>
  );
};

export default CreateConfigurationItem;