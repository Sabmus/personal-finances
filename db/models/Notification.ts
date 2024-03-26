import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import timestampMs from '../utils/timestamp';
import { users, groups } from '@/db/models';

export const notifications = sqliteTable('notification', {
  id: text('id').notNull().primaryKey(),
  from: text('from')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  to: text('to')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  groupId: text('groupId')
    .notNull()
    .references(() => groups.id, { onDelete: 'cascade' }),
  status: text('status').notNull(),
  ...timestampMs,
});

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
