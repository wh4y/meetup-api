import { FindMeetupOptions } from '../../../../domain/meetup/service/options/find-meetup.options';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindMeetupDto implements FindMeetupOptions {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  public id?: number;

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

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  public page?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  public count?: number;
}
