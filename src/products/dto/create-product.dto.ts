import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  MaxLength,
  IsEnum,
} from 'class-validator';
export enum Categoria {
  Laptop = 'laptop',
  Celular = 'celular',
  Tablet = 'tablet',
  Monitor = 'monitor',
  Accesorio = 'accesorio',
  Otro = 'otro',
}
export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(55)
  codigo: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  precio: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  @IsNotEmpty()
  @IsEnum(Categoria)
  categoria: Categoria;
}
