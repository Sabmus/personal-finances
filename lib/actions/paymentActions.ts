'use server';

import { db } from '@/db';
import { PaymentSchema } from '@/lib/schemasDefinition';
import { PaymentState } from '@/lib/definitions';
import { createId } from '@paralleldrive/cuid2';
import { User, transactions } from '@/db/models';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { eq, and, isNull } from 'drizzle-orm';
import { getUser } from '@/lib/actions/utils';

export const createPayment = async (prevState: PaymentState, formData: FormData) => {
  // @ts-ignore
  const user: User = await getUser();

  const validatedFields = PaymentSchema.safeParse({
    categoryId: formData.get('categoryId'),
    paymentMethodId: formData.get('paymentMethodId'),
    amount: formData.get('amount'),
    hasInstalment: formData.get('hasInstalment'),
    instalmentQuantity: formData.get('instalmentQuantity'),
    instalmentAmount: formData.get('instalmentAmount'),
    notes: formData.get('notes'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create payment.',
    };
  }

  const { categoryId, paymentMethodId, amount, hasInstalment, instalmentQuantity, instalmentAmount, notes } =
    validatedFields.data;

  try {
    await db.insert(transactions).values({
      id: createId(),
      userId: user.id,
      categoryId,
      paymentMethodId,
      amount,
      hasInstalment: hasInstalment === 'on' ? true : false,
      instalmentQuantity,
      instalmentAmount,
      notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.log(error);
    return { message: 'Something went wrong.', errors: undefined };
  }

  revalidatePath('/dashboard/payment');
  redirect('/dashboard/payment');
};

export const editPayment = async (id: string, prevState: PaymentState, formData: FormData) => {
  const validatedFields = PaymentSchema.safeParse({
    categoryId: formData.get('categoryId'),
    paymentMethodId: formData.get('paymentMethodId'),
    amount: formData.get('amount'),
    hasInstalment: formData.get('hasInstalment'),
    instalmentQuantity: formData.get('instalmentQuantity'),
    instalmentAmount: formData.get('instalmentAmount'),
    notes: formData.get('notes'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create payment.',
    };
  }

  const { categoryId, paymentMethodId, amount, hasInstalment, instalmentQuantity, instalmentAmount, notes } =
    validatedFields.data;

  try {
    await db
      .update(transactions)
      .set({
        categoryId,
        paymentMethodId,
        amount,
        hasInstalment: hasInstalment === 'on' ? true : false,
        instalmentQuantity,
        instalmentAmount,
        notes,
        updatedAt: new Date(),
      })
      .where(and(eq(transactions.id, id), isNull(transactions.deletedAt)));
  } catch (error) {
    console.log(error);
    return { message: 'Something went wrong.', errors: undefined };
  }

  revalidatePath('/dashboard/payment');
  redirect('/dashboard/payment');
};

export const deletePayment = async (id: string) => {
  try {
    await db.update(transactions).set({ deletedAt: new Date() }).where(eq(transactions.id, id));
  } catch (error) {
    console.log(error);
    throw new Error('Error deleting payment.');
  }

  revalidatePath('/dashboard/payment');
};
