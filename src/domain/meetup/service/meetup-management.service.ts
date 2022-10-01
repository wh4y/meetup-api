import { Injectable } from '@nestjs/common';
import { IMeetupManagementService } from './interface/management-service.interface';
import { Meetup } from '../entity/meetup.entity';
import { UpdateMeetupOptions } from './options/update-meetup.options';
import { CreateMeetupOptions } from '../entity/options/create-meetup.options';
import { MeetupService } from './meetup.service';

@Injectable()
export class MeetupManagementService implements IMeetupManagementService {
  constructor(private readonly meetupService: MeetupService) {
  }

  async cancelMeetup(id: number): Promise<Meetup> {
    const meetup = await this.meetupService.findById(id);
    await this.meetupService.delete(id);

    return meetup;
  }

  async editMeetup(id: number, options: UpdateMeetupOptions): Promise<Meetup> {
    await this.meetupService.update(id, options);

    return await this.meetupService.findById(id);
  }

  async registerMeetup(options: CreateMeetupOptions): Promise<Meetup> {
    const meetup = await this.meetupService.createOne(options);

    return meetup;
  }
}
