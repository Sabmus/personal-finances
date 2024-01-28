import { db } from '@/db';
import { categories, paymentMethods, transactions } from '@/db/models';
import { isNull, eq, and } from 'drizzle-orm';
import { TAllTransactions } from '@/lib/definitions';

// TODO: type the result of this function
export const getCategories = async () => {
  try {
    const result = await db
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting categories.');
  }
};

// TODO: type the result of this function
export const getPaymentMethods = async () => {
  try {
    const result = await db
      .select({
        id: paymentMethods.id,
        name: paymentMethods.name,
      })
      .from(paymentMethods);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting Payment Methods.');
  }
};

export const getAllTransactions = async () => {
  try {
    const result: TAllTransactions[] = await db
      .select({
        id: transactions.id,
        category: categories.name,
        categoryId: transactions.categoryId,
        paymentMethod: paymentMethods.name,
        paymentMethodId: transactions.paymentMethodId,
        amount: transactions.amount,
        hasInstalment: transactions.hasInstalment,
        instalmentQuantity: transactions.instalmentQuantity,
        instalmentAmount: transactions.instalmentAmount,
        notes: transactions.notes,
        createdAt: transactions.createdAt,
      })
      .from(transactions)
      .leftJoin(categories, eq(categories.id, transactions.categoryId))
      .leftJoin(paymentMethods, eq(paymentMethods.id, transactions.paymentMethodId))
      .where(isNull(transactions.deletedAt));

    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting all transactions.');
  }
};

export const getTransaction = async (id: string) => {
  try {
    const result: TAllTransactions[] = await db
      .select({
        id: transactions.id,
        category: categories.name,
        categoryId: transactions.categoryId,
        paymentMethod: paymentMethods.name,
        paymentMethodId: transactions.paymentMethodId,
        amount: transactions.amount,
        hasInstalment: transactions.hasInstalment,
        instalmentQuantity: transactions.instalmentQuantity,
        instalmentAmount: transactions.instalmentAmount,
        notes: transactions.notes,
        createdAt: transactions.createdAt,
      })
      .from(transactions)
      .leftJoin(categories, eq(categories.id, transactions.categoryId))
      .leftJoin(paymentMethods, eq(paymentMethods.id, transactions.paymentMethodId))
      .where(and(isNull(transactions.deletedAt), eq(transactions.id, id)));

    return result[0];
  } catch (error) {
    console.log(error);
    throw new Error('Error getting transaction.');
  }
};
