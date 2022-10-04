import { Meetup } from '../../entity/meetup/meetup.entity';

export class MeetupPageResponse {
  public meetups: Meetup[];
  public pageNumber: number;
  public totalCount: number;
}
