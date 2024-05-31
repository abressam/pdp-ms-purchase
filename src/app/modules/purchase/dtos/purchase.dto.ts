import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsBoolean, IsDate} from 'class-validator';

export class PurchaseDto {
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
}
