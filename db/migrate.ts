import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db, connection } from '@/lib/dbConnect';

async function runMigration() {
  // This will run migrations on the database, skipping the ones already applied
  console.log('migrating...');
  await migrate(db, { migrationsFolder: './db/drizzle' });
  // Don't forget to close the connection, otherwise the script will hang
  console.log('closing connection...');
  await connection.close();
}

runMigration();
