'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import { INotificationBellProps } from '@/lib/definitions';
import { NotificationForm } from '@/components/dashboard';

const NotificationBell = ({ notifications }: INotificationBellProps) => {
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleBellClick = () => {
    setNotificationOpen(prev => !prev);
  };

  return (
    <div className="relative bg-surface px-1 py-1 rounded-md">
      {notifications.data && notifications.data.length > 0 && (
        <span className="absolute text-white font-semibold text-sm top-1 right-2 bg-success leading-none rounded-full">
          {notifications.data.length}
        </span>
      )}
      <Bell
        fill={notifications?.data?.length ? 'yellow' : 'transparent'}
        size={28}
        className="text-foreground-secondary hover:cursor-pointer"
        onClick={handleBellClick}
      />
      <div
        className={`absolute flex flex-col gap-2 z-20 -right-14 top-11 px-4 py-2 border border-accent  ${
          notificationOpen ? '' : 'hidden'
        } transition-all duration-200 ease-in rounded-md bg-background`}
      >
        <h5 className="text-nowrap">Group Invitations</h5>
        {notifications.data ? (
          notifications.data.map((item, index) => (
            <div key={index} className="flex gap-8 items-center">
              <div className="flex flex-col text-nowrap">
                <span className="text-lg">{item.group}</span>
                <span className="text-sm text-foreground-secondary">{item.from}</span>
              </div>
              <div className="flex gap-2">
                {/* <NotificationForm from={item.from} groupId={item.group} /> */}
              </div>
            </div>
          ))
        ) : (
          <span>no notifications</span>
        )}
      </div>
    </div>
  );
};

export default NotificationBell;
