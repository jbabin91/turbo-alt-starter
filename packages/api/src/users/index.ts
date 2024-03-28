import {
  db,
  type InsertUserInput,
  insertUserSchema,
  type UpdateUserInput,
  updateUserSchema,
  users,
} from '@repo/db';
import { eq } from 'drizzle-orm';

// Create
export async function createUser(userData: InsertUserInput) {
  try {
    const newUser = insertUserSchema.safeParse(userData);

    if (!newUser.success) {
      throw new Error('Invalid user data');
    }

    const existingUser = await getUserByEmail(newUser.data.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    await db.insert(users).values(newUser.data);

    return {
      message: 'User created successfully',
    };
  } catch {
    throw new Error('Internal server error');
  }
}

// Read
export async function getUserById(userId: string) {
  try {
    const user = await db.select().from(users).where(eq(users.id, userId));

    return {
      ...user,
    };
  } catch {
    throw new Error('Internal server error');
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));

    return {
      ...user,
    };
  } catch {
    throw new Error('Internal server error');
  }
}

// Update
export async function updateUser(userId: string, userData: UpdateUserInput) {
  try {
    const updatedUser = updateUserSchema.safeParse(userData);

    if (!updatedUser.success) {
      throw new Error('Invalid user data');
    }

    const userExists = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!userExists) {
      throw new Error('User does not exist');
    }

    await db.update(users).set(updatedUser.data).where(eq(users.id, userId));

    return {
      message: 'User updated successfully',
    };
  } catch {
    throw new Error('Internal server error');
  }
}

// Delete
export async function deleteUser(userId: string) {
  try {
    const userExists = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!userExists) {
      throw new Error('User does not exist');
    }

    await db.delete(users).where(eq(users.id, userId));

    return {
      message: 'User deleted successfully',
    };
  } catch {
    throw new Error('Internal server error');
  }
}
