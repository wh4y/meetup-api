import { FindMeetupOptions } from '../../../../domain/meetup/service/options/find-meetup.options';
import { Transform } from 'class-transformer';

export class FindMeetupDto implements FindMeetupOptions {
  @Transform(({ value }) => Number(value))
  public id?: number;
  public title?: string;
  public description?: string;
  public datetime?: Date;
  public address?: string;
  public tags?: string [];
  @Transform(({ value }) => Number(value))
  public page?: number;
  @Transform(({ value }) => Number(value))
  public count?: number;
}
