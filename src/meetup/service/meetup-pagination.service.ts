import { Injectable } from '@nestjs/common';
import { MeetupPage } from './interface/meetup-page.interface';
import { MeetupPaginationOptions } from './options/meetup-pagination.options';
import { MeetupService } from './meetup.service';
import { IMeetupPaginationService } from './interface/meetup-pagination-service.interface';
import { FindMeetupOptions } from './options/find-meetup.options';

@Injectable()
export class MeetupPaginationService implements IMeetupPaginationService {
  constructor(private readonly meetupService: MeetupService) {
  }

  async getPage(findOptions: FindMeetupOptions, paginationOptions?: MeetupPaginationOptions): Promise<MeetupPage> {
    const pageNumber = paginationOptions.page ? paginationOptions.page : 1;
    const count = paginationOptions.count ? paginationOptions.count : null;

    const meetups = await this.meetupService.findMany(findOptions, pageNumber, count);
    const totalCount = await this.meetupService.getTotalCount(findOptions);

    return { meetups, pageNumber, totalCount };
  }
}
