import { sqliteTable, text, real } from 'drizzle-orm/sqlite-core';
import timestampMs from '../utils/timestamp';
import { users, group } from '@/db/models';

export const userGroup = sqliteTable('userGroup', {
  id: text('id').notNull().primaryKey(),
  groupId: text('groupId')
    .notNull()
    .references(() => group.id, { onDelete: 'cascade' }),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  split: real('split').notNull().default(1.0),
  ...timestampMs,
});
