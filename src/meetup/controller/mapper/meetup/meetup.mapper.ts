import { Injectable } from '@nestjs/common';
import { Meetup } from 'src/meetup/entity/meetup/meetup.entity';
import { MeetupPageResponse } from '../../response/meetup-page.response';

@Injectable()
export class MeetupMapper {
  public async mapMeetupsToPage(meetups: Meetup[], totalCount: number, pageNumber: number): Promise<MeetupPageResponse> {
    const page = { meetups, totalCount, pageNumber };
    Reflect.setPrototypeOf(page, MeetupPageResponse.prototype);

    return page;
  }
}
