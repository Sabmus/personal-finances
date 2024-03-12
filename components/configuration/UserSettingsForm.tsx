'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { UserDataState, IUserData } from '@/lib/definitions';
import { createUserData, editUserData } from '@/lib/actions/userDataActions';
import toast from 'react-hot-toast';
import { SubmitButton } from '@/components/ui';

interface IUserSettingsFormProps {
  type: string;
  userData?: IUserData;
  handleEditMode: () => void;
}

const UserSettingsForm = ({ type, userData, handleEditMode }: IUserSettingsFormProps) => {
  const initialFormState: UserDataState = { errors: {}, message: '' };
  const editUserDataWithId = editUserData.bind(null, userData?.id || '');

  const useFormStateFunc = type === 'create' ? createUserData : editUserDataWithId;
  const [state, formAction] = useFormState(useFormStateFunc, initialFormState);

  useEffect(() => {
    if (!state.errors) {
      handleEditMode();
      toast.success(state.message || 'Updated Successfully');
    }
    if (state.errors) {
      state.errors?.salary?.forEach((error: string) => {
        toast.error(error);
      });
      state.errors?.company?.forEach((error: string) => {
        toast.error(error);
      });
      state.errors?.position?.forEach((error: string) => {
        toast.error(error);
      });
    }
  }, [state, handleEditMode]);

  return (
    <div>
      <form action={formAction} className="flex flex-col">
        <div className="h-14 px-4 py-2 flex items-center gap-2 rounded-md hover:bg-background hover:border-r-4 hover:border-r-accent">
          <label htmlFor="salary" className="text-accent w-20">
            Salary:
          </label>
          <input
            type="number"
            name="salary"
            id="salary"
            placeholder="Salary"
            aria-describedby="salary-error"
            defaultValue={userData?.salary ?? ''}
          />
          {state.errors && state.errors.salary && (
            <div id="salary-error" className="text-red-500">
              {state.errors.salary}
            </div>
          )}
        </div>
        <div className="h-14 px-4 py-2 flex items-center gap-2 rounded-md hover:bg-background hover:border-r-4 hover:border-r-accent">
          <label htmlFor="company" className="text-accent w-20">
            Company:
          </label>
          <input
            type="text"
            name="company"
            id="company"
            placeholder="Company"
            aria-describedby="company-error"
            defaultValue={userData?.company ?? ''}
          />
          {state.errors && state.errors.company && (
            <div id="company-error" className="text-red-500">
              {state.errors.company}
            </div>
          )}
        </div>

        <div className="h-14 px-4 py-2 flex items-center gap-2 rounded-md hover:bg-background hover:border-r-4 hover:border-r-accent">
          <label htmlFor="position" className="text-accent w-20">
            Position:
          </label>
          <input
            type="text"
            name="position"
            id="position"
            placeholder="Position"
            aria-describedby="position-error"
            defaultValue={userData?.position ?? ''}
          />
          {state.errors && state.errors.position && (
            <div id="position-error" className="text-red-500">
              {state.errors.position}
            </div>
          )}
        </div>

        <SubmitButton btnName="Save" className="w-1/3" />
      </form>
    </div>
  );
};

export default UserSettingsForm;
