import { mysqlTable } from 'drizzle-orm/mysql-core';
import * as t from 'drizzle-orm/mysql-core';

export const products = mysqlTable('productos', {
  codigo: t.varchar({ length: 55 }).notNull().primaryKey(),
  nombre: t.varchar('nombre', { length: 256 }).unique().notNull(),
  descripcion: t.varchar({ length: 256 }).notNull(),
  precio: t
    .decimal('precio', { precision: 10, scale: 2 })
    .$type<number>()
    .notNull(),
  stock: t.int().notNull(),
  activo: t.boolean().default(true),
  categoria: t.mysqlEnum([
    'laptop',
    'celular',
    'tablet',
    'monitor',
    'accesorio',
    'otro',
  ]),
});
