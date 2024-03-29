'use server';

import { db } from '@/db';
import { PaymentMethodSchema, CategorySchema } from '@/lib/schemasDefinition';
import { PaymentMethodState } from '@/lib/definitions';
import { createId } from '@paralleldrive/cuid2';
import { User, paymentMethods } from '@/db/models';
import { revalidatePath } from 'next/cache';
import { eq, and, isNull } from 'drizzle-orm';
import { getUser, checkPaymentMethodExists } from '@/lib/actions/utils';

export const createPaymentMethod = async (prevState: PaymentMethodState, formData: FormData) => {
  // @ts-ignore
  const user: User = await getUser();

  const validatedFields = PaymentMethodSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create payment method.',
    };
  }

  const { name } = validatedFields.data;
  const paymentMethodExists = await checkPaymentMethodExists(user, name);

  if (paymentMethodExists) {
    return {
      errors: { name: ['Payment Method already exists.'] },
      message: 'Failed to create payment method.',
    };
  }

  try {
    await db.insert(paymentMethods).values({
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
  //redirect('/dashboard/paymentMethods');
  return { message: 'Payment Method created successfully', errors: undefined };
};

export const editPaymentMethod = async (id: string, prevState: PaymentMethodState, formData: FormData) => {
  const validatedFields = CategorySchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to edit payment method.',
    };
  }

  const { name } = validatedFields.data;

  try {
    await db
      .update(paymentMethods)
      .set({
        name,
        updatedAt: new Date(),
      })
      .where(and(eq(paymentMethods.id, id), isNull(paymentMethods.deletedAt)));
  } catch (error) {
    console.log(error);
    return { message: 'Something went wrong.', errors: undefined };
  }

  revalidatePath('/dashboard/configuration');
  //redirect('/dashboard/paymentMethods');
  return { message: 'Payment Method updated successfully', errors: undefined };
};

export const deletePaymentMethod = async (id: string) => {
  try {
    await db.update(paymentMethods).set({ deletedAt: new Date() }).where(eq(paymentMethods.id, id));
  } catch (error) {
    console.log(error);
    //throw new Error('Error deleting category.');
    return { status: 'error', message: 'Error deleting Payment Method.' };
  }

  revalidatePath('/dashboard/configuration');
  //redirect('/dashboard/configuration');
  return { status: 'success', message: 'Deleted successfully.' };
};
