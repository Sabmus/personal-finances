'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/lib/auth';
import { db } from '@/db';
import { transactions, User, categories, paymentMethods } from '@/db/models';
import { createId } from '@paralleldrive/cuid2';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PaymentState, CategoryState, PaymentMethodState } from '@/lib/definitions';
import { eq, and, isNull } from 'drizzle-orm';
import { PaymentSchema, CategorySchema, PaymentMethodSchema } from '@/lib/schemasDefinition';

const getUser = async () => {
  const session = await auth();
  return session?.user;
};

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

/* PAYMENTS */
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

/* CATEGORIES */
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

  revalidatePath('/dashboard/categories');
  redirect('/dashboard/categories');
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

  revalidatePath('/dashboard/categories');
  redirect('/dashboard/categories');
};

export const deleteCategory = async (id: string) => {
  try {
    await db.update(categories).set({ deletedAt: new Date() }).where(eq(categories.id, id));
  } catch (error) {
    console.log(error);
    throw new Error('Error deleting category.');
  }

  revalidatePath('/dashboard/categories');
};

/* PAYMENT METHODS */
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

  revalidatePath('/dashboard/paymentMethods');
  redirect('/dashboard/paymentMethods');
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

  revalidatePath('/dashboard/paymentMethods');
  redirect('/dashboard/paymentMethods');
};

export const deletePaymentMethod = async (id: string) => {
  try {
    await db.update(paymentMethods).set({ deletedAt: new Date() }).where(eq(paymentMethods.id, id));
  } catch (error) {
    console.log(error);
    throw new Error('Error deleting category.');
  }

  revalidatePath('/dashboard/configuration');
  redirect('/dashboard/configuration');
};
