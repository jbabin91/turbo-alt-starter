import { logger } from '@bogeychan/elysia-logger';
import swagger from '@elysiajs/swagger';
import {
  createPost,
  createUser,
  deletePost,
  deleteUser,
  getPostById,
  getPosts,
  getPostsByAuthor,
  getUserByEmail,
  getUserById,
  getUsers,
  updatePost,
  updateUser,
} from '@repo/api';
import {
  type InsertPostInput,
  type InsertUserInput,
  type UpdatePostInput,
  type UpdateUserInput,
} from '@repo/db';
import { Elysia } from 'elysia';

const app = new Elysia({ prefix: '/api' })
  .use(
    logger({
      level: 'error',
    }),
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Elysia API',
          version: '0.1.0',
        },
        tags: [
          { description: 'General endpoints', name: 'App' },
          { description: 'Authentication endpoints', name: 'Auth' },
          { description: 'Profile endpoints', name: 'Profile' },
          { description: 'User endpoints', name: 'User' },
        ],
      },
    }),
  )
  .get(
    '/',
    (ctx) => {
      ctx.log.info('Hello Elysia');
      return 'Hello Elysia';
    },
    {
      detail: {
        tags: ['App'],
      },
    },
  );

app.group('/auth', (app) =>
  app
    .post(
      '/sign-up',
      (ctx) => {
        ctx.log.info('Sign up');
        return 'Sign up';
      },
      {
        detail: {
          tags: ['Auth'],
        },
      },
    )
    .post(
      '/sign-in',
      (ctx) => {
        ctx.log.info('Sign in');
        return 'Sign in';
      },
      {
        detail: {
          tags: ['Auth'],
        },
      },
    ),
);

app.group('/profile', (app) =>
  app.get(
    '/:id',
    async ({ params: { id }, log }) => {
      log.info('Profile');
      return await getUserById(id);
    },
    {
      detail: {
        tags: ['Profile'],
      },
    },
  ),
);

app.group('/users', (app) =>
  app
    .get(
      '/',
      async ({ log }) => {
        log.info('Get all Users');
        return await getUsers();
      },
      {
        detail: {
          tags: ['User'],
        },
      },
    )
    .get(
      '/:email',
      async ({ params: { email }, log }) => {
        log.info(`Get User by Email: ${email}`);
        return await getUserByEmail(email);
      },
      {
        detail: {
          tags: ['User'],
        },
      },
    )
    .post(
      '/',
      async ({ body, log }) => {
        log.info('Create User');
        return await createUser(body as InsertUserInput);
      },
      {
        detail: {
          tags: ['User'],
        },
      },
    )
    .put(
      '/:id',
      async ({ params: { id }, body, log }) => {
        log.info(`Update User by ID: ${id}`);
        return await updateUser(id, body as UpdateUserInput);
      },
      {
        detail: {
          tags: ['User'],
        },
      },
    )
    .delete(
      '/:id',
      async ({ params: { id }, log }) => {
        log.info(`Delete User by ID: ${id}`);
        return await deleteUser(id);
      },
      {
        detail: {
          tags: ['User'],
        },
      },
    ),
);

app.group('/posts', (app) =>
  app
    .get(
      '/',
      async ({ log }) => {
        log.info('Get All Post');
        return await getPosts();
      },
      {
        detail: {
          tags: ['Post'],
        },
      },
    )
    .get(
      '/:id',
      async ({ params: { id }, log }) => {
        log.info(`Get Post by ID: ${id}`);
        return await getPostById(id);
      },
      {
        detail: {
          tags: ['Post'],
        },
      },
    )
    .get(
      '/by-author/:authorId',
      async ({ params: { authorId }, log }) => {
        log.info(`Get Post by Author ID: ${authorId}`);
        return await getPostsByAuthor(authorId);
      },
      {
        detail: {
          tags: ['Post'],
        },
      },
    )
    .post(
      '/',
      async ({ body, log }) => {
        log.info('Create Post');
        return await createPost(body as InsertPostInput);
      },
      {
        detail: {
          tags: ['Post'],
        },
      },
    )
    .put(
      '/:id',
      async ({ params: { id }, body, log }) => {
        log.info(`Update Post by ID: ${id}`);
        return await updatePost(id, body as UpdatePostInput);
      },
      {
        detail: {
          tags: ['Post'],
        },
      },
    )
    .delete(
      '/:id',
      async ({ params: { id }, log }) => {
        log.info(`Delete Post by ID: ${id}`);
        return await deletePost(id);
      },
      {
        detail: {
          tags: ['Post'],
        },
      },
    ),
);

app.listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
