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
  console.log('createUser', userData);
  // try {
  const newUser = insertUserSchema.safeParse(userData);

  if (!newUser.success) {
    throw new Error('Invalid user data');
  }

  const existingUser = await getUserByEmail(newUser.data.email);

  console.log(existingUser);

  if (existingUser) {
    throw new Error('User already exists');
  }

  await db.insert(users).values(newUser.data);

  return {
    message: 'User created successfully',
  };
  // } catch {
  //   throw new Error('Internal server error');
  // }
}

// Read
export async function getUsers() {
  console.log('getUsers');
  try {
    const users = await db.query.users.findMany({
      columns: {
        password: false,
      },
    });
    return [...users];
  } catch {
    throw new Error('Internal server error');
  }
}

export async function getUserById(userId: string) {
  console.log('getUserById', userId);
  try {
    const user = await db.query.users.findMany({
      columns: { password: false },
      where: eq(users.id, userId),
    });

    console.log(user);

    return {
      ...user,
    };
  } catch {
    throw new Error('Internal server error');
  }
}

export async function getUserByEmail(email: string) {
  console.log('getUserByEmail', email);
  try {
    const user = await db.query.users.findFirst({
      columns: { password: false },
      where: eq(users.email, email),
    });

    return {
      ...user,
    };
  } catch {
    throw new Error('Internal server error');
  }
}

// Update
export async function updateUser(userId: string, userData: UpdateUserInput) {
  console.log('updateUser');
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
  console.log('deleteUser');
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
