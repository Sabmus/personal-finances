'use server';

import { db } from '@/db';
import { CategorySchema } from '@/lib/schemasDefinition';
import { CategoryState } from '@/lib/definitions';
import { createId } from '@paralleldrive/cuid2';
import { User, categories } from '@/db/models';
import { revalidatePath } from 'next/cache';
import { eq, and, isNull } from 'drizzle-orm';
import { getUser } from '@/lib/actions/utils';

export const createCategory = async (prevState: CategoryState, formData: FormData) => {
  // @ts-ignore
  const user: User = await getUser();

  const validatedFields = CategorySchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create category.',
    };
  }

  const { name } = validatedFields.data;

  try {
    await db.insert(categories).values({
      id: createId(),
      userId: user.id,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.log(error);
    return { message: 'Something went wrong.', errors: undefined };
  }

  revalidatePath('/dashboard/configuration');
  //redirect('/dashboard/configuration');
  return { message: 'Category created successfully.', errors: undefined };
};

export const editCategory = async (id: string, prevState: CategoryState, formData: FormData) => {
  const validatedFields = CategorySchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to edit category.',
    };
  }

  const { name } = validatedFields.data;

  try {
    await db
      .update(categories)
      .set({
        name,
        updatedAt: new Date(),
      })
      .where(and(eq(categories.id, id), isNull(categories.deletedAt)));
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
    await db.update(categories).set({ deletedAt: new Date() }).where(eq(categories.id, id));
  } catch (error) {
    console.log(error);
    //throw new Error('Error deleting category.');
    return { status: 'error', message: 'Error deleting category.' };
  }

  revalidatePath('/dashboard/configuration');
  return { status: 'success', message: 'Category deleted successfully.' };
};
