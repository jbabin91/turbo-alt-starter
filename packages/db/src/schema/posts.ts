import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { boolean, index, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';

import { users } from './users';

export const posts = pgTable(
  'posts',
  {
    id: text('id')
      .$defaultFn(() => createId())
      .primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    draft: boolean('draft').notNull().default(false),
    authorId: text('author_id')
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      idIdx: index('posts_id_idx').on(table.id),
    };
  },
);

export const selectPostSchema = createSelectSchema(posts);
export type SelectPostInput = z.infer<typeof selectPostSchema>;
export const insertPostSchema = createInsertSchema(posts);
export type InsertPostInput = z.infer<typeof insertPostSchema>;
export const updatePostSchema = insertPostSchema.partial().omit({ id: true });
export type UpdatePostInput = z.infer<typeof updatePostSchema>;

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
