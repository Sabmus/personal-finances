'use client';

import { useRef, useState } from 'react';
import { UserSettingsForm } from '@/components/configuration';
import { IUerSettingsProps } from '@/lib/definitions';
import { toCLP } from '@/utils';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const UserSettings = ({ userData }: IUerSettingsProps) => {
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
    setEditMode(prev => !prev);
  };

  const divRef = useRef(null);
  useOnClickOutside(divRef, () => setEditMode(false));

  return (
    <div ref={divRef} className="flex flex-col gap-2 h-full">
      <div className="text-right">
        <button
          className={`btn-outline ${
            editMode && 'bg-error text-foreground hover:bg-error-hover hover:text-foreground'
          }`}
          onClick={handleEditMode}
        >
          {!editMode ? 'Edit Settings' : 'Cancel'}
        </button>
      </div>
      {editMode ? (
        <div className="h-full">
          <UserSettingsForm type="edit" userData={userData.data} handleEditMode={handleEditMode} />
        </div>
      ) : (
        <div className="h-full">
          <div className="h-14 px-4 py-2 flex items-center gap-2 rounded-md hover:bg-background hover:border-r-4 hover:border-r-accent">
            <span className="text-accent w-20">Salary:</span>
            <span className={`${userData?.data?.salary || 'text-foreground-secondary'}`}>
              {toCLP(userData?.data?.salary || 0)}
            </span>
          </div>
          <div className="h-14 px-4 py-2 flex items-center gap-2 rounded-md hover:bg-background hover:border-r-4 hover:border-r-accent">
            <span className="text-accent w-20">Company:</span>
            <span className={`${userData?.data?.company || 'text-foreground-secondary'}`}>
              {userData?.data?.company || 'Not set'}
            </span>
          </div>
          <div className="h-14 px-4 py-2 flex items-center gap-2 rounded-md hover:bg-background hover:border-r-4 hover:border-r-accent">
            <span className="text-accent w-20">Position:</span>
            <span className={`${userData?.data?.position || 'text-foreground-secondary'}`}>
              {userData?.data?.position || 'Not set'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
