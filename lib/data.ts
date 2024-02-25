import { db } from '@/db';
import { categories, paymentMethods, transactions, groups } from '@/db/models';
import { isNull, eq, and, sum, desc } from 'drizzle-orm';
import { TAllTransactions, IDimension } from '@/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { createId } from '@paralleldrive/cuid2';
import { getUser } from '@/lib/actions/utils';

export const getGroups = async () => {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    const user = await getUser();
    const result: IDimension[] = await db
      .select({
        id: groups.id,
        name: groups.name,
      })
      .from(groups)
      .where(and(isNull(groups.deletedAt), eq(groups.owner, user?.id || '')));
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting groups.');
  }
};

export const getCategories = async () => {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    const user = await getUser();
    const result: IDimension[] = await db
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories)
      .where(and(isNull(categories.deletedAt), eq(categories.userId, user?.id || '')));
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting categories.');
  }
};

export const getPaymentMethods = async () => {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    const user = await getUser();
    const result: IDimension[] = await db
      .select({
        id: paymentMethods.id,
        name: paymentMethods.name,
      })
      .from(paymentMethods)
      .where(and(isNull(paymentMethods.deletedAt), eq(paymentMethods.userId, user?.id || '')));
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting Payment Methods.');
  }
};

export const getAllTransactions = async () => {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    const user = await getUser();
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
      .where(and(isNull(transactions.deletedAt), eq(transactions.userId, user?.id || '')));

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

export const createInitialCategory = async (userId: string) => {
  try {
    await db.insert(categories).values({
      id: createId(),
      userId,
      name: 'Food',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.log(error);
    throw new Error('Error creating initial category.');
  }
  return;
};

export const createInitialPaymentMethod = async (userId: string) => {
  try {
    await db.insert(paymentMethods).values({
      id: createId(),
      userId,
      name: 'Debit Card',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.log(error);
    throw new Error('Error creating initial payment method.');
  }
  return;
};

export const getTotalAmount = async () => {
  try {
    const user = await getUser();
    const result = await db
      .select({
        totalAmount: sum(transactions.amount),
      })
      .from(transactions)
      .where(and(isNull(transactions.deletedAt), eq(transactions.userId, user?.id || '')));
    return result[0].totalAmount || 0;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting total amount.');
  }
};

export const getTop3Categories = async () => {
  try {
    const user = await getUser();
    const amountByCategory = db.$with('amountByCategory').as(
      db
        .select({
          category: categories.name,
          amount: sum(transactions.amount).as('amount'),
        })
        .from(transactions)
        .leftJoin(categories, eq(categories.id, transactions.categoryId))
        .where(and(isNull(transactions.deletedAt), eq(transactions.userId, user?.id || '')))
        .groupBy(transactions.categoryId)
    );
    const result = await db
      .with(amountByCategory)
      .select()
      .from(amountByCategory)
      .orderBy(desc(amountByCategory.amount))
      .limit(3);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting top 3 categories.');
  }
};
