'use client';

import {
  CategoryState,
  PaymentMethodState,
  GroupState,
  ICreateConfigurationItemProps,
} from '@/lib/definitions';
import { useFormState } from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { SubmitButton } from '@/components/ui';
import toast from 'react-hot-toast';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const CreateConfigurationItem = ({ action, btnTitle }: ICreateConfigurationItemProps) => {
  const initialState: CategoryState | PaymentMethodState | GroupState = { errors: {}, message: '' };
  const [state, formAction] = useFormState(action, initialState);
  const divRef = useRef(null);

  useOnClickOutside(divRef, () => setCreate(false));

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
        <div ref={divRef} className="flex justify-between items-center px-2 select-none">
          <form action={formAction} className="flex justify-between w-full items-center">
            <input type="text" name="name" id="name" className="px-2 mr-2 w-2/3" autoFocus />
            <SubmitButton btnName="Save" className="mr-4" />
          </form>
          <span>
            <X
              size={20}
              className=" text-red-400 hover:cursor-pointer hover:scale-110"
              onClick={handleBtnClick}
            />
          </span>
        </div>
      ) : (
        <div className="flex items-center">
          <button className="btn-outline w-full" onClick={handleBtnClick}>
            {btnTitle}
          </button>
        </div>
      )}
    </>
  );
};

export default CreateConfigurationItem;
