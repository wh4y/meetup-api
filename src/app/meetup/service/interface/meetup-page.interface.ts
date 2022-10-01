import { Meetup } from './meetup.interface';

export interface MeetupPage {
  meetups: Meetup[];
  pageNumber: number;
  totalCount: number;
}
