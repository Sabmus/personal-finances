import { integer } from 'drizzle-orm/sqlite-core';

const timestampMs = {
  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).notNull(),
  deltedAt: integer('deletedAt', { mode: 'timestamp_ms' }),
};

export default timestampMs;
