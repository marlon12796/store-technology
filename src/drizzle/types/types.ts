import * as schema from '../schema/schema';
import { MySqlDatabase } from 'drizzle-orm/mysql-core';
import { InferSelectModel } from 'drizzle-orm';
// Define el tipo de la base de datos correctamente
export type DrizzleDB = MySqlDatabase<any, any, typeof schema>;
export type ProductsModel = InferSelectModel<typeof schema.products>;
export const df = <Type>(val: Partial<Type>): Type => val as Type;
