'use server';

import { Redis } from '@upstash/redis';
import { InviteGroupMemberSchema } from '@/lib/schemasDefinition';
import { InviteGroupMemberState } from '@/lib/definitions';

// The function that takes care of obtaining the country code from Vercel headers
// And publishing messages to the Upstash Redis database with the current timestamp
export const sendMemberInvite = async (
  ownerEmail: string,
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

  const invitationObj = {
    from: ownerEmail,
    to: email,
  };

  // Publish the email to the "posts" channel in Upstash Redis
  await redis.publish(
    'memberInvited',
    JSON.stringify({
      invitationObj,
      date: new Date().toString(),
    })
  );

  return { message: 'Invitation Sent!', errors: undefined };
};
