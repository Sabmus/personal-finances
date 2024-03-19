'use server';

import { Redis } from '@upstash/redis';
import { InviteGroupMemberSchema } from '@/lib/schemasDefinition';
import { InviteGroupMemberState } from '@/lib/definitions';

export const sendMemberInvite = async (
  ownerEmail: string,
  groupId: string,
  prevState: InviteGroupMemberState,
  formData: FormData
) => {
  const redis = Redis.fromEnv();

  const validatedFields = InviteGroupMemberSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to send invitation.',
    };
  }

  const { email } = validatedFields.data;

  // create a set with the owner's email as the key and the email as the value
  await redis.publish(
    'notifications',
    JSON.stringify({
      from: ownerEmail,
      to: email,
      groupId,
    })
  );

  return { message: 'Invitation Sent!', errors: undefined };
};
