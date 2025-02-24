import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/types';
import { eq } from 'drizzle-orm';
import { ventas } from 'src/drizzle/schema/ventas.schema';

@Injectable()
export class SalesService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  create(createSaleDto: CreateSaleDto) {
    return 'This action adds a new sale';
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
      where: eq(ventas.codigo, id),
      with: {
        detallesVenta: true,
      },
    });
    if (!sale) throw new NotFoundException(`Venta con id ${id} no encontrado.`);

    return sale;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
