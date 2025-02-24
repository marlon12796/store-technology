import { relations, sql } from 'drizzle-orm';
import {
  mysqlTable,
  varchar,
  decimal,
  datetime,
  boolean,
} from 'drizzle-orm/mysql-core';
import { detallesVenta } from './detallesVenta.schema';

export const ventas = mysqlTable('ventas', {
  codigo: varchar({ length: 55 }).notNull().primaryKey(),
  numeroDocumento: varchar('numero_documento', { length: 50 }).notNull(),
  fechaEmision: datetime('fecha_emision')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  cliente: varchar('cliente', { length: 255 }).notNull(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 })
    .$type<number>()
    .notNull(),
  igv: decimal('igv', { precision: 10, scale: 2 }).$type<number>().notNull(),
  total: decimal('total', { precision: 10, scale: 2 })
    .$type<number>()
    .notNull(),
  eliminado: boolean('eliminado').default(false).notNull(),
});
export const ventasRelations = relations(ventas, ({ many }) => ({
  detallesVenta: many(detallesVenta),
}));
