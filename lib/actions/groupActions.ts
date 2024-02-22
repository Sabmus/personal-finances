'use server';

import { db } from '@/db';
import { GroupSchema } from '@/lib/schemasDefinition';
import { GroupState } from '@/lib/definitions';
import { createId } from '@paralleldrive/cuid2';
import { User, groups, userGroups } from '@/db/models';
import { revalidatePath } from 'next/cache';
import { eq, and, isNull } from 'drizzle-orm';
import { getUser } from '@/lib/actions/utils';

export const createGroup = async (prevState: GroupState, formData: FormData) => {
  // @ts-ignore
  const user: User = await getUser();

  const validatedFields = GroupSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    console.log('🚀 ~ createGroup ~ validatedFields:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create group.',
    };
  }

  const { name, description } = validatedFields.data;

  try {
    const newGroup = await db
      .insert(groups)
      .values({
        id: createId(),
        owner: user.id,
        name,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    await db.insert(userGroups).values({
      id: createId(),
      groupId: newGroup[0].id,
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.log(error);
    return { message: 'Something went wrong.', errors: undefined };
  }

  revalidatePath('/dashboard/configuration');
  //redirect('/dashboard/configuration');
  return { message: 'Group created successfully.', errors: undefined };
};

export const editCategory = async (id: string, prevState: GroupState, formData: FormData) => {
  const validatedFields = GroupSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to edit group.',
    };
  }

  const { name, description } = validatedFields.data;

  try {
    await db
      .update(groups)
      .set({
        name,
        description,
        updatedAt: new Date(),
      })
      .where(and(eq(groups.id, id), isNull(groups.deletedAt)));
  } catch (error) {
    console.log(error);
    return { message: 'Something went wrong.', errors: undefined };
  }

  revalidatePath('/dashboard/configuration');
  //redirect('/dashboard/configuration');
  return { message: 'Updated Successfully.', errors: undefined };
};

export const deleteCategory = async (id: string) => {
  try {
    await db.update(groups).set({ deletedAt: new Date() }).where(eq(groups.id, id));
  } catch (error) {
    console.log(error);
    //throw new Error('Error deleting category.');
    return { status: 'error', message: 'Error deleting category.' };
  }

  revalidatePath('/dashboard/configuration');
  return { status: 'success', message: 'Group deleted successfully.' };
};
