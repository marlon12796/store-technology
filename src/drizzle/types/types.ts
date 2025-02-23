import * as schema from '../schema/schema';
import { MySqlDatabase } from 'drizzle-orm/mysql-core';

// Define el tipo de la base de datos correctamente
export type DrizzleDB = MySqlDatabase<any, any, typeof schema>;
