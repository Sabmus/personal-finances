'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/lib/auth';
import { z } from 'zod';
import { db } from '@/db';
import { transactions } from '@/db/models';

export type PaymentState = {
  errors?: {
    categoryId?: string[];
    paymentMethodId?: string[];
    amount?: string[];
    hasInstalment?: string[];
    instalmentQuantity?: string[];
    instalmentAmount?: string[];
    notes?: string[];
  };
  message?: string;
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
    db.insert(transactions).values({
      userId: '',
      categoryId,
      paymentMethodId,
      amount,
      hasInstalment: hasInstalment === 'on' ? 1 : 0,
      instalmentQuantity,
      instalmentAmount,
      notes,
    });
  } catch (error) {
    console.log(error);
    return { message: 'Something went wrong.', errors: undefined };
  }

  return { message: 'Payment created successfully.', errors: undefined };
};
