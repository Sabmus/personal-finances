import { getGroupsInvitations } from '@/lib/data';
import { NotificationBell } from '@/components/dashboard';

export const revalidate = 5000;

const Notification = async () => {
  const notifications = await getGroupsInvitations();

  return (
    <div className="select-none">
      <NotificationBell notifications={notifications} />
    </div>
  );
};

export default Notification;
