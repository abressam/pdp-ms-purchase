import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetPurchasesByCustomerReqDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  customerId: number;
}
