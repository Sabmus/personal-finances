'use server';

import { db } from '@/db';
import { UserDataSchema } from '@/lib/schemasDefinition';
import { UserDataState } from '@/lib/definitions';
import { createId } from '@paralleldrive/cuid2';
import { User, userData } from '@/db/models';
import { revalidatePath } from 'next/cache';
import { eq, and } from 'drizzle-orm';
import { getUser } from '@/lib/actions/utils';

export const createUserData = async (prevState: UserDataState, formData: FormData) => {
  // @ts-ignore
  const user: User = await getUser();

  const validatedFields = UserDataSchema.safeParse({
    salary: formData.get('salary'),
    company: formData.get('company'),
    position: formData.get('position'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create user data.',
    };
  }

  const { salary, company, position } = validatedFields.data;

  try {
    await db.insert(userData).values({
      id: createId(),
      userId: user.id,
      salary,
      company,
      position,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.log(error);
    return { message: 'Something went wrong.', errors: undefined };
  }

  revalidatePath('/dashboard/configuration');
  //redirect('/dashboard/configuration');
  return { message: 'User data created successfully.', errors: undefined };
};

export const editUserData = async (id: string, prevState: UserDataState, formData: FormData) => {
  // @ts-ignore
  const user: User = await getUser();

  const validatedFields = UserDataSchema.safeParse({
    salary: formData.get('salary'),
    company: formData.get('company'),
    position: formData.get('position'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to edit user data.',
    };
  }

  const { salary, company, position } = validatedFields.data;

  try {
    await db
      .update(userData)
      .set({
        salary,
        company,
        position,
        updatedAt: new Date(),
      })
      .where(and(eq(userData.id, id), eq(userData.userId, user.id)));
  } catch (error) {
    console.log(error);
    return { message: 'Something went wrong.', errors: undefined };
  }

  revalidatePath('/dashboard/configuration');
  //redirect('/dashboard/configuration');
  return { message: 'Updated Successfully.', errors: undefined };
};
