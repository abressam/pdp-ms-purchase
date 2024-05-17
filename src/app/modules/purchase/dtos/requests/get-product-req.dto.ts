import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetPurchaseReqDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
