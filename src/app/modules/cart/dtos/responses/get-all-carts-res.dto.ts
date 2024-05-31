import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { CartDto } from '@app/modules/cart/dtos/cart.dto';

export class GetAllCartsResDto {
  @ApiProperty()
  @IsNotEmptyObject({ nullable: false })
  cart: CartDto[];
}
