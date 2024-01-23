import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import timestampMs from '../utils/timestamp';

const options: readonly [string, ...string[]] = ['Debit', 'Credit', 'Cash', 'Other'];

export const paymentMethods = sqliteTable('paymentMethod', {
  id: text('id').notNull().primaryKey(),
  name: text('name', { enum: options }).notNull(),
  ...timestampMs,
});

export type PaymentMethod = typeof paymentMethods.$inferSelect;
export type NewPaymentMethod = typeof paymentMethods.$inferInsert;
