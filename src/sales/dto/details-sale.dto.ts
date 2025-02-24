import { Transform } from 'class-transformer';
import {
  IsInt,
  IsPositive,
  IsString,
  Min,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class DetallesVentaDTO {
  @IsString({ message: 'El código de venta debe ser un string' })
  @MaxLength(55, {
    message: 'El código de venta no puede superar los 55 caracteres',
  })
  codigoVenta: string;

  @IsString({ message: 'El código de producto debe ser un string' })
  @MaxLength(55, {
    message: 'El código de producto no puede superar los 55 caracteres',
  })
  codigoProducto: string;

  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @IsPositive({ message: 'La cantidad debe ser mayor que 0' })
  cantidad: number;

  @IsNumber({}, { message: 'El precio debe ser un número válido' })
  @Min(0.01, { message: 'El precio debe ser mayor que 0' })
  @Transform(({ value }) => Number(parseFloat(value).toFixed(2)))
  precio: number;

  @IsInt({ message: 'El descuento debe ser un número entero' })
  @Min(0, { message: 'El descuento mínimo es 0%' })
  descuento: number;
}
