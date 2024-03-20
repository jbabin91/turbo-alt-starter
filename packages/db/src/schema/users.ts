import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

import { posts } from './posts';

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const selectUserSchema = createSelectSchema(users);
export type SelectUserInput = z.infer<typeof selectUserSchema>;
export const insertUserSchema = createInsertSchema(users);
export type InsertUserInput = z.infer<typeof insertUserSchema>;

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));
