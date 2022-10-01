import { IMeetupService } from './interface/meetup-service.interface';
import { CreateMeetupOptions } from '../entity/options/create-meetup.options';
import { Meetup } from '../entity/meetup.entity';
import { Injectable } from '@nestjs/common';
import { MeetupRepository } from '../../../infra/database/repository/meetup.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FindMeetupOptions } from './options/find-meetup.options';
import { ArrayContains, FindOptionsWhere } from 'typeorm';

@Injectable()
export class MeetupService implements IMeetupService {
  constructor(
    @InjectRepository(Meetup)
    private readonly meetupRepo: MeetupRepository,
  ) {
  }

  public async createOne(options: CreateMeetupOptions): Promise<Meetup> {
    const meetup = Meetup.create(options);

    return await this.meetupRepo.save(meetup);
  }

  public async delete(id: number): Promise<void> {
    const existingMeetup = await this.findById(id);
    if (!existingMeetup) throw Error('Meetup doesn\'t exist!');

    await this.meetupRepo.delete({ id });
  }

  public async update(id: number, options: any): Promise<void> {
    const existingMeetup = await this.findById(id);
    if (!existingMeetup) throw Error('Meetup doesn\'t exist!');

    await this.meetupRepo.update({ id }, options);
  }

  public async findMany(options?: FindMeetupOptions): Promise<Meetup[]> {
    console.log(options);
    let findMeetupOptions: {} | FindOptionsWhere<Meetup> | FindOptionsWhere<Meetup>[] = { ...options };
    if (options) findMeetupOptions = {
      ...options,
      tags: options.tags ? ArrayContains(options.tags) : null,
    };

    return await this.meetupRepo.findBy(findMeetupOptions);
  }

  public async findById(id: number): Promise<Meetup> {
    return await this.meetupRepo.findOne({ where: { id } });
  }
}
