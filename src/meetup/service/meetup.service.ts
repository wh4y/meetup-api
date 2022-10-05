import { IMeetupService } from './interface/meetup-service.interface';
import { CreateMeetupOptions } from '../entity/meetup/options/create-meetup.options';
import { Meetup } from '../entity/meetup/meetup.entity';
import { Injectable } from '@nestjs/common';
import { MeetupRepository } from '../repository/meetup.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FindMeetupOptions } from './options/find-meetup.options';
import { ArrayContains, FindOptionsWhere } from 'typeorm';
import { UserService } from '../module/auth/module/user/service/user.service';

@Injectable()
export class MeetupService implements IMeetupService {
  constructor(
    @InjectRepository(Meetup)
    private readonly meetupRepo: MeetupRepository,
    private readonly userService: UserService,
  ) {
  }

  public async registerMeetup(options: CreateMeetupOptions): Promise<Meetup> {
    const meetup = await this.meetupRepo.findOneBy({
      title: options.title,
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
      relations: {
        guests: true,
      },
    });
  }

  public async findById(id: number): Promise<Meetup> {
    return await this.meetupRepo.findOne({ where: { id }, relations: { guests: true } });
  }

  public async getTotalCount(options?: FindMeetupOptions): Promise<number> {
    let findManyOptions: {} | FindOptionsWhere<Meetup> | FindOptionsWhere<Meetup>[] = {};
    if (options) findManyOptions = {
      ...options,
      tags: options.tags ? ArrayContains(options.tags) : null,
    };

    return await this.meetupRepo.count({ where: findManyOptions });
  }

  public async registerGuestForMeetup(meetupId: number, userId: number): Promise<void> {
    let meetup = await this.findById(meetupId);
    if (!meetup) throw new Error('Meetup doesn\'t exist!');

    const guest = await this.userService.findById(userId);
    if (!guest) throw new Error('User doesn\'t exist!');

    const isUserAlreadyRegistered = meetup.guests
      .some((registeredGuest) => registeredGuest.id === guest.id);
    if (isUserAlreadyRegistered) throw new Error('Guest has already registered for this meetup!');

    meetup = meetup.withGuests([...meetup.guests, guest]);
    await this.meetupRepo.save(meetup);
  }

  async unregisterGuestForMeetup(meetupId: number, userId: number): Promise<void> {
    let meetup = await this.findById(meetupId);
    if (!meetup) throw new Error('Meetup doesn\'t exist!');

    const guest = await this.userService.findById(userId);
    if (!guest) throw new Error('User doesn\'t exist!');

    const isUserAlreadyRegistered = meetup.guests
      .some((registeredGuest) => registeredGuest.id === guest.id);
    if (!isUserAlreadyRegistered) throw new Error('Guest hasn\'t registered for this meetup!');

    const guests = meetup.guests.filter((registeredGuest) => registeredGuest.id !== guest.id);

    meetup = meetup.withGuests([...guests]);
    await this.meetupRepo.save(meetup);
  }
}
