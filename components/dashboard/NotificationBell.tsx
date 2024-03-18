'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import toast from 'react-hot-toast';

const NotificationBell = () => {
  // Initial set of messages
  const [notifications, setNotifications] = useState([]);
  // Function to take care of initial connect to the SSE API
  // Also, it reconnects to the SSE API as soon as it shuts down
  // This keeps the connection alive - forever with micro second delays
  const connectToStream = () => {
    // Connect to /api/stream as the SSE API source
    const eventSource = new EventSource('/api/stream');

    eventSource.addEventListener('message', event => {
      // Parse the data received from the stream into JSON
      // Add it the list of messages seen on the page
      const tmp = JSON.parse(event.data);
      // Maintain a list of notifications
      setNotifications(prevNotification => [...prevNotification, tmp]);
      // Create a toast with the latest notification
      toast(`from: ${tmp.invitationObj.from} to ${tmp.invitationObj.to}`);
    });

    // In case of any error, close the event source
    // So that it attempts to connect again
    eventSource.addEventListener('error', error => {
      console.log('Error event: ', error);
      eventSource.close();
      setTimeout(connectToStream, 1);
    });
    // As soon as SSE API source is closed, attempt to reconnect
    eventSource.close = () => {
      setTimeout(connectToStream, 1);
    };
    return eventSource;
  };

  useEffect(() => {
    // Initiate the first call to connect to SSE API
    const eventSource = connectToStream();
    // As the component unmounts, close listener to SSE API
    return () => {
      eventSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
