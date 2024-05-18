import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsBoolean, IsArray, IsObject } from 'class-validator';

export class PutCartReqDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  qt_total?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  customerId?: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  cartProducts?: {
    productId: number;
    quantity: number;
  }[];
}
