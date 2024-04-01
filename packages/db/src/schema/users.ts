import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

import { posts } from './posts';

export const users = pgTable(
  'users',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => {
    return {
      idIdx: index('users_id_idx').on(table.id),
      email: index('users_email_idx').on(table.email),
    };
  },
);

export const selectUserSchema = createSelectSchema(users);
export type SelectUserInput = z.infer<typeof selectUserSchema>;
export const insertUserSchema = createInsertSchema(users);
export type InsertUserInput = z.infer<typeof insertUserSchema>;
export const updateUserSchema = insertUserSchema.partial().omit({ id: true });
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));
