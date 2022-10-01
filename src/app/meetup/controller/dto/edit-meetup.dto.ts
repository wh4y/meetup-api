import { UpdateMeetupOptions } from '../../../../domain/meetup/service/options/update-meetup.options';
import { ArrayNotEmpty, IsArray, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditMeetupDto implements UpdateMeetupOptions {

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description?: string;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  public datetime?: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public address?: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  @IsOptional()
  public tags?: string [];
}
