import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/web';

if (!process.env.DB_URL) {
  throw new Error('dbConnect.js: DB_URL not found in .env.local');
}

if (!process.env.DB_TOKEN) {
  throw new Error('dbConnect.js: DB_TOKEN not found in .env.local');
}

const client = createClient({ url: process.env.DB_URL, authToken: process.env.DB_TOKEN });
export const db = drizzle(client, { logger: true });
