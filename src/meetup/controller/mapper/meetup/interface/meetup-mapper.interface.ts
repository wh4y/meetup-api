import { Meetup } from '../../../../entity/meetup/meetup.entity';
import { MeetupPageResponse } from '../../../response/meetup-page.response';

export interface IMeetupMapper {
  mapMeetupsToPage(meetups: Meetup[], totalCount: number, pageNumber: number): Promise<MeetupPageResponse>;
}
