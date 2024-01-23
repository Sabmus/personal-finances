import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import timestampMs from '../utils/timestamp';

export const categories = sqliteTable('category', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
  ...timestampMs,
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
