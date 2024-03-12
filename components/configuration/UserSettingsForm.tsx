'use client';
import { useFormState } from 'react-dom';
import { UserDataState, IUserData } from '@/lib/definitions';
import { createUserData, editUserData } from '@/lib/actions/userDataActions';

interface IUserSettingsFormProps {
  type: string;
  id?: string;
  userData?: IUserData;
}

const UserSettingsForm = ({ type, id, userData }: IUserSettingsFormProps) => {
  const initialFormState: UserDataState = { errors: {}, message: '' };
  const editUserDataWithId = editUserData.bind(null, id || '');

  const useFormStateFunc = type === 'create' ? createUserData : editUserDataWithId;

  const [state, formAction] = useFormState(useFormStateFunc, initialFormState);

  return (
    <div>
      <form action={formAction} className="flex flex-col gap-2">
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
        <button className="btn">{type === 'create' ? 'Create' : 'Save'}</button>
      </form>
    </div>
  );
};

export default UserSettingsForm;
