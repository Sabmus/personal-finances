import dotenv from 'dotenv';
import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';

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

async function dropTables() {
  try {
    console.log('drop in progress...');
    const db = drizzle(client);

    await db.run(sql`drop table if exists userGroup;`);

    console.log('closing connection...');
    client.close();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

dropTables();
