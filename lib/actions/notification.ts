'use server';

import { InviteGroupMemberSchema, AcceptDeclineGroupMemberSchema } from '@/lib/schemasDefinition';
import { InviteGroupMemberState, AcceptDeclineGroupMemberState } from '@/lib/definitions';
import { db } from '@/db';
import { notifications, User, users, userGroups } from '@/db/models';
import { createId } from '@paralleldrive/cuid2';
import { getUser } from '@/lib/actions/utils';
import { and, eq } from 'drizzle-orm';

export const sendMemberInvite = async (
  groupId: string,
  prevState: InviteGroupMemberState,
  formData: FormData
) => {
  // @ts-ignore
  const user: User = await getUser();

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

  try {
    const userToInvite = await db
      .select({
        id: users.id,
      })
      .from(users)
      .where(eq(users.email, email));

    if (!userToInvite) {
      throw new Error('User not found');
    }

    await db.insert(notifications).values({
      id: createId(),
      from: user.id,
      to: userToInvite[0].id,
      groupId,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.log(error);
    return { message: 'Something went wrong.', errors: undefined };
  }

  return { message: 'Invitation Sent!', errors: undefined };
};

export const acceptGroupInvite = async (
  from: string,
  groupId: string,
  prevState: any,
  formData: FormData
) => {
  // @ts-ignore
  const user: User = await getUser();

  try {
    await db.insert(userGroups).values({
      id: createId(),
      groupId,
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await db
      .update(notifications)
      .set({
        status: 'accepted',
      })
      .where(
        and(
          eq(notifications.from, from),
          eq(notifications.groupId, groupId),
          eq(notifications.to, user.id)
        )
      );
  } catch (error) {
    console.log(error);
    return { message: 'Something went wrong.', errors: undefined };
  }

  return { message: 'Group invitation accepted!.', errors: undefined };
};

export const declineGroupInvite = async (
  from: string,
  groupId: string,
  prevState: any,
  formData: FormData
) => {
  // @ts-ignore
  const user: User = await getUser();

  try {
    await db
      .update(notifications)
      .set({
        status: 'declined',
      })
      .where(
        and(
          eq(notifications.from, from),
          eq(notifications.groupId, groupId),
          eq(notifications.to, user.id)
        )
      );
  } catch (error) {
    console.log(error);
    return { message: 'Something went wrong.', errors: undefined };
  }

  return { message: 'Group invitation declined.', errors: undefined };
};
