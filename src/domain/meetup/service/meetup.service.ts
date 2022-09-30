import { IMeetupService } from './interface/meetup-service.interface';
import { CreateMeetupOptions } from '../entity/options/create-meetup.options';
import { Meetup } from '../entity/meetup.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MeetupService implements IMeetupService {
  async createOne(options: CreateMeetupOptions): Promise<Meetup> {
    const meetup = Meetup.create(options);

    return meetup;
  }

  async delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  async update(updatedMeetup: Meetup): Promise<void> {
    return Promise.resolve(undefined);
  }

  async findAll(): Promise<Meetup[]> {
    return Promise.resolve([]);
  }

  async findById(id: number): Promise<Meetup> {
    return Promise.resolve(undefined);
  }
}
