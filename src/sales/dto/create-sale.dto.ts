import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { DetallesVentaDTO } from './details-sale.dto';
import { Type } from 'class-transformer';

export class CreateSaleDto {
  @IsString({ message: 'El código de venta debe ser un string' })
  @MaxLength(55, {
    message: 'El código de venta no puede superar los 55 caracteres',
  })
  codigo: string;

  @IsString({ message: 'El número de documento debe ser un string' })
  @Matches(/^\d{8}$|^\d{11}$/, {
    message:
      'El número de documento debe ser un DNI (8 dígitos) o un RUC (11 dígitos)',
  })
  numeroDocumento: string;

  @IsString({ message: 'El nombre del cliente debe ser un string' })
  @MaxLength(255, {
    message: 'El nombre del cliente no puede superar los 255 caracteres',
  })
  cliente: string;
  @IsNumber({}, { message: 'El subtotal debe ser un número válido' })
  @Min(0.01, { message: 'El subtotal debe ser mayor que 0' })
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'El subtotal debe tener máximo 2 decimales',
  })
  subtotal: number;

  @IsNumber({}, { message: 'El IGV debe ser un número válido' })
  @Min(0.01, { message: 'El IGV debe ser mayor que 0' })
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'El IGV debe tener máximo 2 decimales',
  })
  igv: number;

  @IsNumber({}, { message: 'El total debe ser un número válido' })
  @Min(0.01, { message: 'El total debe ser mayor que 0' })
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'El total debe tener máximo 2 decimales',
  })
  total: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DetallesVentaDTO)
  detallesVenta: DetallesVentaDTO[];
}
