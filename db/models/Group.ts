import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import timestampMs from '../utils/timestamp';
import { users } from '@/db/models';

export const groups = sqliteTable('group', {
  id: text('id').notNull().primaryKey(),
  owner: text('owner')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  ...timestampMs,
});

export type Group = typeof group.$inferSelect;
export type NewGroup = typeof group.$inferInsert;
