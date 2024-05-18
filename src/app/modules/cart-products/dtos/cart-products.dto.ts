import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { ProductDto } from '@app/modules/product/dtos/product.dto';

export class CartProductsDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cartId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNotEmptyObject()
  product: ProductDto;
}
