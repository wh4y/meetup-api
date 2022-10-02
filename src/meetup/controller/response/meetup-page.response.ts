import { MeetupResponse } from './meetup.response';

export class MeetupPageResponse {
  public meetups: MeetupResponse[];
  public pageNumber: number;
  public totalCount: number;
}
