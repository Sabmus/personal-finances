'use server';

import { Redis } from '@upstash/redis';
import { InviteGroupMemberSchema } from '@/lib/schemasDefinition';
import { InviteGroupMemberState } from '@/lib/definitions';

// The function that takes care of obtaining the country code from Vercel headers
// And publishing messages to the Upstash Redis database with the current timestamp
export const sendMemberInvite = async (
  ownerEmail: string,
  groupId: string,
  prevState: InviteGroupMemberState,
  formData: FormData
) => {
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

  //   'use server';
  const redis = Redis.fromEnv();

  // create a set with the owner's email as the key and the email as the value
  await redis.sadd(email, {
    sender: ownerEmail,
    group: groupId,
  });

  return { message: 'Invitation Sent!', errors: undefined };
};
