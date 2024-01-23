import dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config({ path: process.cwd() + '/.env.local', override: true });

if (!process.env.DB_URL) {
  throw new Error('DB_URL not found in .env.local');
}

if (!process.env.DB_TOKEN) {
  throw new Error('DB_TOKEN not found in .env.local');
}

export default {
  schema: './db/models/*',
  out: './db/drizzle/migrations',
  driver: 'turso', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  verbose: true,
  dbCredentials: {
    url: process.env.DB_URL,
    authToken: process.env.DB_TOKEN,
  },
} satisfies Config;
