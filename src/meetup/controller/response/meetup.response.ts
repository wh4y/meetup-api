import { Meetup } from '../../service/interface/meetup.interface';

export class MeetupResponse implements Meetup {
  public id: number;
  public datetime: Date;
  public address: string;
  public description: string;
  public tags: string[];
  public title: string;
}
