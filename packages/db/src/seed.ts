import { faker } from '@faker-js/faker';
import { createId } from '@paralleldrive/cuid2';

import { db } from './db';
import {
  type InsertPostInput,
  type InsertUserInput,
  posts,
  users,
} from './schema';

if (!('DATABASE_URL' in process.env)) {
  throw new Error('DATABASE_URL is not defined.');
}

const main = async () => {
  const userData: InsertUserInput[] = [];
  const postData: InsertPostInput[] = [];

  // Clean up the database
  await db.delete(posts);
  await db.delete(users);

  // Add Test Users
  userData.push(
    {
      id: createId(),
      name: 'Test User',
      email: 'test@email.com',
      password: 'password',
    },
    {
      id: createId(),
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: 'password',
    },
  );

  // Create random users
  for (let i = 0; i < 5; i++) {
    userData.push({
      email: faker.internet.email(),
      id: createId(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
    });
  }

  // Create random posts for each user
  for (const userDatum of userData) {
    for (let i = 0; i < 5; i++) {
      postData.push({
        title: faker.lorem.words({ max: 10, min: 3 }),
        content: faker.lorem.paragraphs({ max: 25, min: 5 }),
        draft: faker.datatype.boolean(),
        authorId: userDatum.id!,
      });
    }
  }

  console.log('seeding users');
  await db.insert(users).values(userData);
  console.log('done seeding users');
  console.log('seeding posts');
  await db.insert(posts).values(postData);
  console.log('done seeding posts');
};

await main()
  .then(() => {
    console.log('seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('error seeding:', error);
    process.exit(1);
  });
