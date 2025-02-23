import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});
export default defineConfig({
  schema: './src/drizzle/schema/**.schema.ts',
  dialect: 'mysql',
  out: './drizzle',
  dbCredentials: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  verbose: true,
  strict: true,
});
