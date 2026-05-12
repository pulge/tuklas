import { defineConfig } from 'drizzle-kit';
import { homedir } from 'os';
import { join } from 'path';

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:' + join(homedir(), '.tuklas', 'tuklas.db'),
  },
});
