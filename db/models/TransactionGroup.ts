import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';
import timestampMs from '../utils/timestamp';
import { users, group, categories, paymentMethods } from '@/db/models';

export const transactionsGroup = sqliteTable('transactionsGroup', {
  id: text('id').notNull().primaryKey(),
  groupId: text('groupId')
    .notNull()
    .references(() => group.id, { onDelete: 'cascade' }),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  categoryId: text('categoryId')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  paymentMethodId: text('paymentMethodId')
    .notNull()
    .references(() => paymentMethods.id, { onDelete: 'cascade' }),
  amount: real('amount').notNull(),
  hasInstalment: integer('hasInstalment', { mode: 'boolean' }),
  instalmentQuantity: integer('instalmentQuantity'),
  instalmentAmount: real('instalmentAmount'),
  notes: text('notes'),
  ...timestampMs,
});

export type TransactionGroup = typeof transactionsGroup.$inferSelect;
export type NewTransactionGroup = typeof transactionsGroup.$inferInsert;
