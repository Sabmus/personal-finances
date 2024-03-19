'use client';

import { useEffect } from 'react';
import { Bell } from 'lucide-react';
import toast from 'react-hot-toast';

const NotificationBell = () => {
  const notifications = [];

  useEffect(() => {
    const eventSource = new EventSource('/api/stream');

    eventSource.addEventListener('message', event => {
      const tmp = JSON.parse(event.data);
      console.log('🚀 ~ eventSource.addEventListener ~ tmp:', tmp);
    });

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="relative bg-surface px-1 py-1 rounded-md hover:cursor-pointer">
      <span
        className={`${
          notifications.length ? 'absolute' : 'hidden'
        } text-white font-semibold text-sm top-1 right-2 bg-success leading-none rounded-full`}
      >
        {notifications.length}
      </span>
      <Bell
        fill={notifications.length ? 'yellow' : 'transparent'}
        size={28}
        className="text-foreground-secondary"
      />
    </div>
  );
};

export default NotificationBell;
