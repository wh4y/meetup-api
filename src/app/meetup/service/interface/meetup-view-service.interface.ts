import { MeetupPage } from './meetup-page.interface';
import { GetPageOptions } from '../options/get-page.options';

export interface IMeetupViewService {
  getPage(options?: GetPageOptions): Promise<MeetupPage>;
}
