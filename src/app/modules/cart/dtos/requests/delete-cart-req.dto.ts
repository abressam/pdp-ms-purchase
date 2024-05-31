import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsNotEmpty } from 'class-validator';

export class DeleteCartReqDto {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}
