import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UnregisterGuestDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  guestId: number;
}
