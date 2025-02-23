import { mysqlTable } from 'drizzle-orm/mysql-core';
import * as t from 'drizzle-orm/mysql-core';
export const Products = mysqlTable('productos', {
  codigo: t.varchar({ length: 55 }).notNull().primaryKey(),
  nombre: t.varchar('nombre', { length: 256 }).unique().notNull(),
  descripcion: t.varchar({ length: 256 }).notNull(),
  precio: t.decimal('precio', { precision: 10, scale: 2 }).notNull(),
  stock: t.int().notNull(),
  active: t.boolean().default(true),
  categoria: t.mysqlEnum([
    'Laptop',
    'Celular',
    'Tablet',
    'Monitor',
    'Accesorio',
    'Otro',
  ]),
});
