import { mysqlTable, int, varchar, decimal } from 'drizzle-orm/mysql-core';
import { ventas } from './ventas.schema';
import { products } from './products.schema';

export const detallesVenta = mysqlTable('detalles_venta', {
  id: int().autoincrement().primaryKey(),
  codigoVenta: varchar('codigo_venta', { length: 55 }).references(
    () => ventas.codigo,
  ),
  codigoProducto: varchar('codigo_producto', { length: 55 }).references(
    () => products.codigo,
  ),
  cantidad: int('cantidad').default(1).notNull(),
  precio: decimal('precio', { precision: 10, scale: 2 }).notNull(),
  descuento: int('descuento').default(0).notNull(),
});
