import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '@/db/schema';

export const connection = new Database(process.env.DB_URI!);
export const db = drizzle(connection, { schema });
