import dotenv from 'dotenv';
import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';
import { categories, paymentMethods } from './models';
import { createId } from '@paralleldrive/cuid2';

dotenv.config({
  path: process.cwd() + '/.env.local',
  override: true,
});

if (!process.env.DB_URL) {
  throw new Error('DB_URL not found in .env.local');
}

if (!process.env.DB_TOKEN) {
  throw new Error('DB_TOKEN not found in .env.local');
}

const client = createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN,
});

const createCategoriesSeed = () => {
  const categoryList = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Others'];
  return categoryList.map(category => {
    return {
      id: createId(),
      name: category,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
};

const createPaymentMethodSeed = () => {
  const paymentMethodList = ['Cash', 'Credit Card', 'Debit Card', 'Others'];
  return paymentMethodList.map(paymentMethod => {
    return {
      id: createId(),
      name: paymentMethod,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
};

async function seed() {
  try {
    console.log('seeding...');
    const db = drizzle(client);

    console.log('seeding categories...');
    await db.insert(categories).values(createCategoriesSeed());

    console.log('seeding payment methods...');
    await db.insert(paymentMethods).values(createPaymentMethodSeed());

    console.log('closing connection...');
    client.close();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seed();
