import { CreateMeetupOptions } from '../../../../domain/meetup/entity/options/create-meetup.options';

export class RegisterMeetupDto implements CreateMeetupOptions {
  public datetime: Date;
  public address: string;
  public description: string;
  public tags: string[];
  public title: string;
}
