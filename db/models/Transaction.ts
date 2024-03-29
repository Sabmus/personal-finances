import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';
import timestampMs from '../utils/timestamp';
import { users, categories, paymentMethods } from '@/db/models';

export const transactions = sqliteTable('transaction', {
  id: text('id').notNull().primaryKey(),
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

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
