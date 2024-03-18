import { UserSettings } from '@/components/configuration';
import { getUserData } from '@/lib/data';

const ProfilePage = async () => {
  const userData = await getUserData();

  return (
    <div className="h-full">
      <UserSettings userData={userData} />
    </div>
  );
};

export default ProfilePage;
