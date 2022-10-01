import { CreateMeetupOptions } from '../../../../domain/meetup/entity/options/create-meetup.options';
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterMeetupDto implements CreateMeetupOptions {
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  public datetime: Date;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  public tags: string[];

  @IsString()
  @IsNotEmpty()
  public title: string;
}
