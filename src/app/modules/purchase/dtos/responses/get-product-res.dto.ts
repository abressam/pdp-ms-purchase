import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { PurchaseDto } from '@app/modules/purchase/dtos/purchase.dto';

export class GetPurchaseResDto {
  @ApiProperty()
  @IsNotEmptyObject({ nullable: false })
  purchase: PurchaseDto;
}