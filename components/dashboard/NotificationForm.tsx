'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { acceptGroupInvite, declineGroupInvite } from '@/lib/actions/notification';
import { AcceptDeclineGroupMemberState } from '@/lib/definitions';
import toast from 'react-hot-toast';

const NotificationForm = ({ from, groupId }: { from: string | null; groupId: string | null }) => {
  const initialState: AcceptDeclineGroupMemberState = { errors: {}, message: '' };

  const acceptGroupInviteBinded = acceptGroupInvite.bind(null, from!, groupId!);
  const declineGroupInviteBinded = declineGroupInvite.bind(null, from!, groupId!);

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
    <>
      <form action={acceptAction}>
        <button className="btn">Accept</button>
      </form>
      <form action={declineAction}>
        <button className="btn">Decline</button>
      </form>
    </>
  );
};

export default NotificationForm;
