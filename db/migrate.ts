import dotenv from 'dotenv';
import { createClient } from '@libsql/client/web';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { drizzle } from 'drizzle-orm/libsql';

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

async function runMigration() {
  try {
    console.log('migrating...');
    const db = drizzle(client);

    await migrate(db, { migrationsFolder: './db/drizzle/migrations', migrationsTable: 'migrations' });
    // Don't forget to close the connection, otherwise the script will hang
    console.log('closing connection...');
    client.close();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMigration();
