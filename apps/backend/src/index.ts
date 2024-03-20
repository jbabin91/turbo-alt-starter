import { logger } from '@bogeychan/elysia-logger';
import swagger from '@elysiajs/swagger';
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
    '/',
    (ctx) => {
      ctx.log.info('Profile');
      return 'Profile';
    },
    {
      detail: {
        tags: ['Profile'],
      },
    },
  ),
);

app.group('/users', (app) =>
  app.get(
    '/',
    (ctx) => {
      ctx.log.info('User');
      return 'User';
    },
    {
      detail: {
        tags: ['User'],
      },
    },
  ),
);

app.group('/posts', (app) =>
  app.get(
    '/',
    (ctx) => {
      ctx.log.info('Post');
      return 'Post';
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
