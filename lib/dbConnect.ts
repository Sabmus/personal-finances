// import dotenv from 'dotenv';

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/web';

/* dotenv.config({
  path: process.cwd() + '/.env.local',
  override: true,
});
 */

if (!process.env.DB_URL) {
  throw new Error('dbConnect.js: DB_URL not found in .env.local');
}

if (!process.env.DB_TOKEN) {
  throw new Error('dbConnect.js: DB_TOKEN not found in .env.local');
}

const client = createClient({ url: process.env.DB_URL, authToken: process.env.DB_TOKEN });

export const db = drizzle(client, {
  // schema: { ...schema },
  logger: {
    logQuery(query, params) {
      console.log(query, params);
    },
  },
});
