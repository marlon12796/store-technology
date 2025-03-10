import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { df, ProductsModel, type DrizzleDB } from 'src/drizzle/types/types';
import { products } from 'src/drizzle/schema/products.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createProductDto: CreateProductDto) {
    try {
      await this.db
        .insert(products)
        .values(df<ProductsModel>(createProductDto))
        .$returningId();
      return {
        success: true,
        data: createProductDto,
      };
    } catch {
      throw new BadRequestException(
        `Error al crear el producto con código #${createProductDto.codigo}`,
      );
    }
  }

  async findAll() {
    const totalProducts = await this.db
      .select()
      .from(products)
      .where(eq(products.activo, true));
    return {
      success: true,
      data: totalProducts,
    };
  }

  async findOne(id: string) {
    const [product] = await this.db
      .select()
      .from(products)
      .where(eq(products.codigo, id));
    if (!product)
      throw new NotFoundException(`Producto con código #${id} no encontrado`);
    if (!product.activo)
      return {
        success: false,
        message: `El producto con código ${id} está eliminado.`,
      };
    return {
      success: true,
      data: product,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const [existingProduct] = await this.db
      .update(products)
      .set(df<ProductsModel>(updateProductDto))
      .where(eq(products.codigo, id));

    if (!existingProduct)
      throw new NotFoundException(`Producto con código ${id} no encontrado`);

    return {
      success: true,
      data: updateProductDto,
    };
  }

  async remove(id: string) {
    await this.db
      .update(products)
      .set(df<ProductsModel>({ activo: false }))
      .where(eq(products.codigo, id));
    return {
      success: true,
      message: `Producto con código #${id} eliminado con éxito`,
    };
  }
}
