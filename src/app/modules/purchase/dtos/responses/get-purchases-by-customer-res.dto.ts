import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, IsNumber, IsNotEmpty } from 'class-validator';
import { PurchaseDto } from '@app/modules/purchase/dtos/purchase.dto';

export class GetPurchasesByCustomerResDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    customerId: number;

    @ApiProperty()
    @IsNotEmptyObject({ nullable: false })
    purchases: PurchaseDto[];
}
