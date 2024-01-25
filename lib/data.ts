import { db } from '@/db';
import { categories, paymentMethods } from '@/db/models';

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
