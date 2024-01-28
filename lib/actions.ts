'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/lib/auth';
import { z } from 'zod';
import { db } from '@/db';
import { transactions, User } from '@/db/models';
import { createId } from '@paralleldrive/cuid2';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PaymentState } from '@/lib/definitions';
import { eq } from 'drizzle-orm';

const getUser = async () => {
  const session = await auth();
  return session?.user;
};

const PaymentSchema = z
  .object({
    categoryId: z
      .string({
        invalid_type_error: 'Category is required.',
      })
      .min(1, { message: 'Category is required.' })
      .cuid2(),
    paymentMethodId: z
      .string({
        invalid_type_error: 'Payment method is required.',
      })
      .min(1, { message: 'Payment method is required.' })
      .cuid2(),
    amount: z.coerce.number().positive({
      message: 'Amount is required.',
    }),
    hasInstalment: z.union([z.literal('on'), z.null()]),
    instalmentQuantity: z.union([
      z.null(),
      z.coerce.number().int().positive({
        message: 'Instalment quantity is required.',
      }),
    ]),
    instalmentAmount: z.union([
      z.null(),
      z.coerce.number().positive({
        message: 'Instalment amount is required.',
      }),
    ]),
    notes: z
      .string()
      .max(255, {
        message: 'Notes must be less than 255 characters.',
      })
      .transform(value => (value === '' ? null : value)),
  })
  .refine(input => {
    if (input.hasInstalment === 'on' && (!input.instalmentAmount || !input.instalmentQuantity)) {
      return false;
    }

    return true;
  });

export const login = async (prevState: any, formData: FormData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn('credentials', { email, password });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid username or password.' };
        default:
          return { error: 'Something went wrong.' };
      }
    }

    // Error: NEXT_REDIRECT
    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
    throw error;
  }
};

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

export const editPayment = async (prevState: PaymentState, formData: FormData) => {
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
      .where(eq(transactions.id, ''));
  } catch (error) {
    console.log(error);
    return { message: 'Something went wrong.', errors: undefined };
  }

  revalidatePath('/dashboard/payment');
  redirect('/dashboard/payment');
};
