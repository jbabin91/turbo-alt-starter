import {
  db,
  type InsertPostInput,
  insertPostSchema,
  posts,
  type UpdatePostInput,
  updatePostSchema,
} from '@repo/db';
import { eq } from 'drizzle-orm';

// Create
export async function createPost(postData: InsertPostInput) {
  try {
    const newPost = insertPostSchema.safeParse(postData);

    if (!newPost.success) {
      throw new Error('Invalid post data');
    }

    await db.insert(posts).values(newPost.data);

    return {
      message: 'Post created successfully',
    };
  } catch {
    throw new Error('Internal server error');
  }
}

// Read
export async function getPostById(postId: string) {
  const post = await db.select().from(posts).where(eq(posts.id, postId));

  return {
    ...post,
  };
}

export async function getPosts() {
  const posts = await db.query.posts.findMany();

  return [...posts];
}

export async function getPostsByAuthor(authorId: string) {
  const authorPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.authorId, authorId));

  return [...authorPosts];
}

// Update
export async function updatePost(postId: string, postData: UpdatePostInput) {
  try {
    const updatedPost = updatePostSchema.safeParse(postData);

    if (!updatedPost.success) {
      throw new Error('Invalid post data');
    }

    const postExists = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId));

    if (!postExists) {
      throw new Error('Post does not exist');
    }

    await db.update(posts).set(updatedPost.data).where(eq(posts.id, postId));

    return {
      message: 'Post updated successfully',
    };
  } catch {
    throw new Error('Internal server error');
  }
}

// Delete
export async function deletePost(postId: string) {
  try {
    const postExists = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId));

    if (!postExists) {
      throw new Error('Post does not exist');
    }

    await db.delete(posts).where(eq(posts.id, postId));

    return {
      message: 'Post deleted successfully',
    };
  } catch {
    throw new Error('Internal server error');
  }
}
