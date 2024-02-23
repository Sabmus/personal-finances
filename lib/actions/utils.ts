import { auth } from '@/lib/auth';
import { db } from '@/db';
import { User, categories, paymentMethods, groups } from '@/db/models';
import { eq, and, isNull } from 'drizzle-orm';

export const getUser = async () => {
  const session = await auth();
  return session?.user;
};

export const checkCategoryExists = async (user: User, name: string) => {
  const category = await db
    .select({
      id: categories.id,
    })
    .from(categories)
    .where(and(eq(categories.name, name), eq(categories.userId, user?.id || ''), isNull(categories.deletedAt)))
    .limit(1);

  return category.length > 0;
};

export const checkPaymentMethodExists = async (user: User, name: string) => {
  const paymentMethod = await db
    .select({
      id: paymentMethods.id,
    })
    .from(paymentMethods)
    .where(
      and(eq(paymentMethods.name, name), eq(paymentMethods.userId, user?.id || ''), isNull(paymentMethods.deletedAt))
    )
    .limit(1);

  return paymentMethod.length > 0;
};

export const checkGroupExists = async (user: User, name: string) => {
  const group = await db
    .select({
      id: groups.id,
    })
    .from(groups)
    .where(and(eq(groups.name, name), eq(groups.owner, user?.id || ''), isNull(groups.deletedAt)))
    .limit(1);

  return group.length > 0;
};
