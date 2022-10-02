import { IMeetupService } from './interface/meetup-service.interface';
import { CreateMeetupOptions } from '../entity/options/create-meetup.options';
import { Meetup } from '../entity/meetup.entity';
import { Injectable } from '@nestjs/common';
import { MeetupRepository } from '../repository/meetup.repository';
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

  public async registerMeetup(options: CreateMeetupOptions): Promise<Meetup> {
    const meetup = await this.meetupRepo.findOneBy({
      ...options,
      tags: ArrayContains(options.tags),
    });
    if (meetup) throw Error('Meetup already exists!');

    return await this.meetupRepo.save(Meetup.create(options));
  }

  public async cancelMeetup(id: number): Promise<Meetup> {
    const meetup = await this.findById(id);
    if (!meetup) throw Error('Meetup doesn\'t exist!');

    await this.meetupRepo.delete({ id });

    return meetup;
  }

  public async editMeetup(id: number, options: any): Promise<Meetup> {
    const meetup = await this.findById(id);
    if (!meetup) throw Error('Meetup doesn\'t exist!');

    await this.meetupRepo.update({ id }, options);

    return await this.findById(id);
  }

  public async findMany(options?: FindMeetupOptions, page?: number, count?: number): Promise<Meetup[]> {
    let findManyOptions: {} | FindOptionsWhere<Meetup> | FindOptionsWhere<Meetup>[] = {};
    if (options) findManyOptions = {
      ...options,
      tags: options.tags ? ArrayContains(options.tags) : null,
    };

    const offset = page && count ? (page - 1) * count : 0;

    return await this.meetupRepo.find({
      where: findManyOptions,
      take: count,
      skip: offset,
    });
  }

  public async findById(id: number): Promise<Meetup> {
    return await this.meetupRepo.findOne({ where: { id } });
  }

  public async getTotalCount(options?: FindMeetupOptions): Promise<number> {
    let findManyOptions: {} | FindOptionsWhere<Meetup> | FindOptionsWhere<Meetup>[] = {};
    if (options) findManyOptions = {
      ...options,
      tags: options.tags ? ArrayContains(options.tags) : null,
    };

    return await this.meetupRepo.count({ where: findManyOptions });
  }
}
