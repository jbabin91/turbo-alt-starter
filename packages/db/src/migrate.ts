import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import * as schema from './schema';

const connectionString = process.env.DATABASE_URL ?? '';
const migrationClient = postgres(connectionString, { max: 1 });

await migrate(drizzle(migrationClient, { schema }), {
  migrationsFolder: './drizzle',
})
  .then(() => {
    console.log('migrations finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('migrations failed', error);
    process.exit(1);
  });
