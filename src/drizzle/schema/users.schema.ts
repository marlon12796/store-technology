import { mysqlTable } from 'drizzle-orm/mysql-core';
import * as t from 'drizzle-orm/mysql-core';
export const Users = mysqlTable('users', {
  id: t.int().primaryKey().autoincrement(),
  nombre: t.varchar('first_name', { length: 256 }).unique().notNull(),
  correo: t.varchar({ length: 256 }).notNull(),
  contrasena: t.varchar({ length: 100 }).notNull(),
});
