'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { acceptGroupInvite, declineGroupInvite } from '@/lib/actions/notification';
import { AcceptDeclineGroupMemberState } from '@/lib/definitions';
import toast from 'react-hot-toast';

const NotificationForm = ({ from, group }: { from: string | null; group: string | null }) => {
  const initialState: AcceptDeclineGroupMemberState = { errors: {}, message: '' };

  const acceptGroupInviteBinded = acceptGroupInvite.bind(null, from!, group!);
  const declineGroupInviteBinded = declineGroupInvite.bind(null, from!, group!);

  const [acceptState, acceptAction] = useFormState(acceptGroupInviteBinded, initialState);
  const [declineState, declineAction] = useFormState(declineGroupInviteBinded, initialState);

  useEffect(() => {
    // accept
    if (acceptState.errors === undefined) {
      // setFormOpen(false);
      toast.success(acceptState.message || 'Accepted!');
    }
    if (acceptState.errors) {
      toast.error('Something went wrong!');
    }

    // decline
    if (declineState.errors === undefined) {
      // setFormOpen(false);
      toast.success(declineState.message || 'Declined!');
    }
    if (declineState.errors) {
      toast.error('Something went wrong!');
    }
  }, [acceptState, declineState]);

  return (
    <div className="flex gap-8 items-center">
      <div className="flex flex-col text-nowrap">
        <span className="text-lg">{group}</span>
        <span className="text-sm text-foreground-secondary">{from}</span>
      </div>
      <div className="flex gap-2">
        <form action="" id={`${group}accept`}>
          <button className="btn">Accept</button>
        </form>
        <form action="" id={`${group}decline`}>
          <button className="btn">Decline</button>
        </form>
      </div>
    </div>
  );
};

export default NotificationForm;
