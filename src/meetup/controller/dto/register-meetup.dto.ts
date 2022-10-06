import { CreateMeetupOptions } from '../../entity/meetup/options/create-meetup.options';
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterMeetupDto implements CreateMeetupOptions {

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  public datetime: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  public tags: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public title: string;
}
