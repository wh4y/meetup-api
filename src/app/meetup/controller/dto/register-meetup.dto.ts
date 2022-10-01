import { CreateMeetupOptions } from '../../../../domain/meetup/entity/options/create-meetup.options';
import { ArrayNotEmpty, IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class RegisterMeetupDto implements CreateMeetupOptions {
  @IsDateString()
  @IsNotEmpty()
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
