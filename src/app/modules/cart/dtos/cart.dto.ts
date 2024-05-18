import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsBoolean, IsNotEmptyObject } from 'class-validator';
import { CartProductsDto } from '@app/modules/cart-products/dtos/cart-products.dto';

export class CartDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  qt_total: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty()
  @IsNotEmptyObject()
  cartProducts: CartProductsDto[];
}
