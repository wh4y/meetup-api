import { MeetupPage } from './meetup-page.interface';
import { MeetupPaginationOptions } from '../options/meetup-pagination.options';
import { FindMeetupOptions } from '../options/find-meetup.options';

export interface IMeetupPaginationService {
  getPage(findOptions?: FindMeetupOptions, paginationOptions?: MeetupPaginationOptions): Promise<MeetupPage>;
}
