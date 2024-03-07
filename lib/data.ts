import { db } from '@/db';
import { categories, paymentMethods, transactions, groups } from '@/db/models';
import { isNull, eq, and, sum, desc } from 'drizzle-orm';
import { TAllTransactions, IDimension, TLastTenTransactions } from '@/lib/definitions';
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
    return { data: result, error: undefined };
  } catch (error) {
    console.log(error);
    // throw new Error('Error getting groups.');
    return { data: undefined, error: 'Error getting groups.' };
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
    return { data: result, error: undefined };
  } catch (error) {
    console.log(error);
    // throw new Error('Error getting categories.');
    return { data: undefined, error: 'Error getting categories.' };
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
    return { data: result, error: undefined };
  } catch (error) {
    console.log(error);
    // throw new Error('Error getting Payment Methods.');
    return { data: undefined, error: 'Error getting Payment Methods.' };
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
      .where(and(isNull(transactions.deletedAt), eq(transactions.userId, user?.id || '')))
      .orderBy(desc(transactions.createdAt));

    return { data: result, error: undefined };
  } catch (error) {
    console.log(error);
    //throw new Error('Error getting all transactions.');
    return { data: undefined, error: 'Error getting all transactions.' };
  }
};

export const getLastTenTransactions = async () => {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    const user = await getUser();
    const result: TLastTenTransactions[] = await db
      .select({
        id: transactions.id,
        category: categories.name,
        //categoryId: transactions.categoryId,
        paymentMethod: paymentMethods.name,
        //paymentMethodId: transactions.paymentMethodId,
        amount: transactions.amount,
        //hasInstalment: transactions.hasInstalment,
        //instalmentQuantity: transactions.instalmentQuantity,
        //instalmentAmount: transactions.instalmentAmount,
        //notes: transactions.notes,
        createdAt: transactions.createdAt,
      })
      .from(transactions)
      .leftJoin(categories, eq(categories.id, transactions.categoryId))
      .leftJoin(paymentMethods, eq(paymentMethods.id, transactions.paymentMethodId))
      .where(and(isNull(transactions.deletedAt), eq(transactions.userId, user?.id || '')))
      .orderBy(desc(transactions.createdAt))
      .limit(10);

    return { data: result, error: undefined };
  } catch (error) {
    console.log(error);
    //throw new Error('Error getting all transactions.');
    return { data: undefined, error: 'Error getting last transactions.' };
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

    return { data: result[0], error: undefined };
  } catch (error) {
    console.log(error);
    // throw new Error('Error getting transaction.');
    return { data: undefined, error: 'Error getting transaction.' };
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
    return { data: result[0].totalAmount, error: undefined };
  } catch (error) {
    console.log(error);
    // throw new Error('Error getting total amount.');
    return { data: undefined, error: 'Error getting total amount.' };
  }
};

export const getTop3Categories = async () => {
  try {
    const user = await getUser();
    const amountByCategory = db.$with('amountByCategory').as(
      db
        .select({
          name: categories.name,
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
    return { data: result, error: undefined };
  } catch (error) {
    console.log(error);
    // throw new Error('Error getting top 3 categories.');
    return { data: undefined, error: 'Error getting top 3 categories.' };
  }
};

export const getTransactionByDay = async () => {
  noStore();

  try {
    const user = await getUser();
    const result = await db
      .select({
        date: transactions.createdAt,
        totalAmount: sum(transactions.amount).as('totalAmount'),
      })
      .from(transactions)
      .where(and(isNull(transactions.deletedAt), eq(transactions.userId, user?.id || '')))
      .groupBy(transactions.createdAt);

    return { data: result, error: undefined };
  } catch (error) {
    console.log(error);
    return { data: undefined, error: 'Error getting transaction by day.' };
  }
};

export const getAmountByPaymentMethod = async () => {
  noStore();

  try {
    const user = await getUser();
    const result = await db
      .select({
        paymentMethod: paymentMethods.name,
        totalAmount: sum(transactions.amount).as('totalAmount'),
      })
      .from(transactions)
      .innerJoin(paymentMethods, eq(paymentMethods.id, transactions.paymentMethodId))
      .where(and(isNull(transactions.deletedAt), eq(transactions.userId, user?.id || '')))
      .groupBy(transactions.paymentMethodId);

    return { data: result, error: undefined };
  } catch (error) {
    console.log(error);
    return { data: undefined, error: 'Error getting amount by payment method.' };
  }
};
