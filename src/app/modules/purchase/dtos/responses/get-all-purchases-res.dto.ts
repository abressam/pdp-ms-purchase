import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { PurchaseDto } from '@app/modules/purchase/dtos/purchase.dto';

export class GetAllPurchasesResDto {
  @ApiProperty()
  @IsNotEmptyObject({ nullable: false })
  purchases: PurchaseDto[];
}
