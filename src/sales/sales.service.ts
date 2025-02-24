import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import {
  df,
  DrizzleDB,
  SaleDetailsModel,
  SalesModel,
} from 'src/drizzle/types/types';
import { and, eq } from 'drizzle-orm';
import { ventas } from 'src/drizzle/schema/ventas.schema';
import { detallesVenta } from 'src/drizzle/schema/detallesVenta.schema';

@Injectable()
export class SalesService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  async create(createSaleDto: CreateSaleDto) {
    const { detallesVenta: detailsSale, ...ventaData } = createSaleDto;
    await this.db.transaction(async (tx) => {
      await tx.insert(ventas).values(df<SalesModel>(ventaData));
      await tx.insert(detallesVenta).values(detailsSale);
    });
    return createSaleDto;
  }

  async findAll() {
    const sales = await this.db.query.ventas.findMany({
      with: {
        detallesVenta: true,
      },
    });
    return sales;
  }

  async findOne(id: string) {
    const sale = await this.db.query.ventas.findFirst({
      where: and(eq(ventas.codigo, id)),
      with: {
        detallesVenta: true,
      },
    });
    if (!sale) throw new NotFoundException(`Venta con id ${id} no encontrado.`);

    return sale;
  }

  async remove(code: string) {
    const resultCode = await this.db.transaction(async (tx) => {
      await tx
        .update(ventas)
        .set(df<SalesModel>({ eliminado: true }))
        .where(eq(ventas.codigo, code));
      await tx
        .update(detallesVenta)
        .set(df<SaleDetailsModel>({ eliminado: true }))
        .where(eq(detallesVenta.codigoVenta, code));
      return code;
    });
    return {
      message: `Venta con código #${resultCode} marcada como eliminada exitosamente `,
    };
  }
}
