import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import timestampMs from '../utils/timestamp';
import { users } from '@/db/models';

export const userData = sqliteTable('userData', {
  id: text('id').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  salary: integer('salary').default(0),
  company: text('company').default(''),
  position: text('position').default(''),
  ...timestampMs,
});

export type userData = typeof userData.$inferSelect;
export type NewUserData = typeof userData.$inferInsert;
