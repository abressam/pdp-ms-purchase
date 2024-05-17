import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsBoolean, IsDate } from 'class-validator';

export class PostPurchaseReqDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  parcel: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  qt_parcel: number;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cartId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  customerId: number;
}
