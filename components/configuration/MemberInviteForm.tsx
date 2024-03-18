'use client';

import { useEffect, useState } from 'react';
import { SubmitButton } from '@/components/ui';
import { sendMemberInvite } from '@/lib/actions/notification';
import { InviteGroupMemberState } from '@/lib/definitions';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';

const MemberInviteForm = ({ ownerEmail, groupId }: { ownerEmail: string; groupId: string }) => {
  const [formOpen, setFormOpen] = useState(false);
  const initialState: InviteGroupMemberState = { errors: {}, message: '' };

  const sendMemberInviteWithUserEmail = sendMemberInvite.bind(null, ownerEmail, groupId);
  const [state, formAction] = useFormState(sendMemberInviteWithUserEmail, initialState);

  useEffect(() => {
    if (state.errors === undefined) {
      toast.success(state.message || 'Updated Successfully');
    }
    if (state.errors?.email) {
      state.errors.email.forEach((error: string) => {
        toast.error(error);
      });
    }
  }, [state]);

  return (
    <div>
      {formOpen ? (
        <form className="flex gap-2" action={formAction}>
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            className="px-2"
            autoFocus
          />
          <SubmitButton btnName="Send" />
          <button onClick={() => setFormOpen(false)}>Cancel</button>
        </form>
      ) : (
        <button className="btn-outline" onClick={() => setFormOpen(true)}>
          Invite Members
        </button>
      )}
    </div>
  );
};

export default MemberInviteForm;
