import {
  mysqlTable,
  int,
  varchar,
  decimal,
  boolean,
} from 'drizzle-orm/mysql-core';
import { ventas } from './ventas.schema';
import { products } from './products.schema';
import { relations } from 'drizzle-orm';

export const detallesVenta = mysqlTable('detalles_venta', {
  id: int().autoincrement().primaryKey(),
  codigoVenta: varchar('codigo_venta', { length: 55 })
    .notNull()
    .references(() => ventas.codigo),
  codigoProducto: varchar('codigo_producto', { length: 55 })
    .notNull()
    .references(() => products.codigo),
  cantidad: int('cantidad').default(1).notNull(),
  precio: decimal('precio', { precision: 10, scale: 2 })
    .$type<number>()
    .notNull(),
  descuento: int('descuento').default(0).notNull(),
  eliminado: boolean('eliminado').default(false).notNull(),
});
export const detallesVentaRelations = relations(detallesVenta, ({ one }) => ({
  venta: one(ventas, {
    fields: [detallesVenta.codigoVenta],
    references: [ventas.codigo],
  }),
  producto: one(products, {
    fields: [detallesVenta.codigoProducto],
    references: [products.codigo],
  }),
}));
