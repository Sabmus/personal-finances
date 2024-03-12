'use client';
import { UserSettingsForm } from '@/components/configuration';
import { IUserSettingsProps } from '@/lib/definitions';
import { toCLP } from '@/utils';

const UserSettings = ({ userData }: { userData: IUserSettingsProps }) => {
  return (
    <div className="h-full border-test">
      <div className="border-test">
        {userData.data ? (
          <>
            <div className="flex">
              <h6>Salary: </h6>
              <span>{toCLP(userData.data.salary || 0)}</span>
            </div>
            <div>
              <h6>Company: </h6>
              <span>{userData.data.company}</span>
            </div>
            <div>
              <h6>Position: </h6>
              <span>{userData.data.position}</span>
            </div>
          </>
        ) : (
          <UserSettingsForm type="create" />
        )}
      </div>
    </div>
  );
};

export default UserSettings;
