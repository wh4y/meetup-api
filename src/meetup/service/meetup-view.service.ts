import { Injectable } from '@nestjs/common';
import { IMeetupViewService } from './interface/meetup-view-service.interface';
import { MeetupPage } from './interface/meetup-page.interface';
import { GetPageOptions } from './options/get-page.options';
import { MeetupService } from './meetup.service';

@Injectable()
export class MeetupViewService implements IMeetupViewService {
  constructor(private readonly meetupService: MeetupService) {
  }

  async getPage(options?: GetPageOptions): Promise<MeetupPage> {
    const getPageOptions = { ...options };
    Reflect.deleteProperty(getPageOptions, 'page');
    Reflect.deleteProperty(getPageOptions, 'count');

    const pageNumber = options.page ? options.page : 1;
    const count = options.count ? options.count : null;

    const meetups = await this.meetupService.findMany(getPageOptions, pageNumber, count);
    const totalCount = await this.meetupService.getTotalCount(getPageOptions);

    return { meetups, pageNumber, totalCount };
  }
}
