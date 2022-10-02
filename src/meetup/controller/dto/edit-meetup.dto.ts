import { UpdateMeetupOptions } from '../../service/options/update-meetup.options';
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class EditMeetupDto implements UpdateMeetupOptions {

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description?: string;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
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
