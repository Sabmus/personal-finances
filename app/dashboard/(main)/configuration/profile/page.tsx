import { UserSettings } from '@/components/configuration';
import { getUserData } from '@/lib/data';
import { getUser } from '@/lib/actions/utils';

const ProfilePage = async () => {
  const userData = await getUserData();
  const user = await getUser();

  return (
    <div className="h-full">
      <UserSettings userData={userData} userId={user?.id} />
    </div>
  );
};

export default ProfilePage;
