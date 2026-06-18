import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export enum DestinoEnum {
  CUSCO = 'cusco',
  LIMA = 'lima',
  AREQUIPA = 'arequipa',
}

export class CreateConsultaDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsEnum(DestinoEnum)
  destino: DestinoEnum;

  @IsString()
  @MinLength(10)
  mensaje: string;
}
