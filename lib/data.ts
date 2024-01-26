import { db } from '@/db';
import { categories, paymentMethods, transactions } from '@/db/models';
import { isNull, eq } from 'drizzle-orm';
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
    const result: TAllTransactions = await db
      .select({
        id: transactions.id,
        category: categories.name,
        paymentMethod: paymentMethods.name,
        amount: transactions.amount,
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
