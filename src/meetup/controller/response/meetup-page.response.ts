import { MeetupResponse } from './meetup.response';
import { MeetupPage } from '../../service/interface/meetup-page.interface';

export class MeetupPageResponse implements MeetupPage {
  public meetups: MeetupResponse[];
  public pageNumber: number;
  public totalCount: number;
}
