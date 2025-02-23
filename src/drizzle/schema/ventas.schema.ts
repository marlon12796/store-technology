import { relations, sql } from 'drizzle-orm';
import { mysqlTable, varchar, decimal, date } from 'drizzle-orm/mysql-core';
import { detallesVenta } from './detallesVenta.schema';

export const ventas = mysqlTable('ventas', {
  codigo: varchar({ length: 55 }).notNull().primaryKey(),
  numeroDocumento: varchar('numero_documento', { length: 50 }).notNull(),
  fechaEmision: date('fecha_emision')
    .default(sql`now()`)
    .notNull(),
  cliente: varchar('cliente', { length: 255 }).notNull(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  igv: decimal('igv', { precision: 10, scale: 2 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
});
export const ventasRelations = relations(ventas, ({ many }) => ({
  detallesVenta: many(detallesVenta),
}));
