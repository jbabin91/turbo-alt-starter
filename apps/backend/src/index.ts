import { logger } from '@bogeychan/elysia-logger';
import { Elysia } from 'elysia';

const app = new Elysia()
  .use(
    logger({
      level: 'error',
    }),
  )
  .get('/', (ctx) => {
    ctx.log.info('Hello Elysia');
    return 'Hello Elysia';
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
