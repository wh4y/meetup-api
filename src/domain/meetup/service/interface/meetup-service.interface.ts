import { CreateMeetupOptions } from '../../entity/options/create-meetup.options';
import { Meetup } from '../../entity/meetup.entity';
import { UpdateMeetupOptions } from '../options/update-meetup.options';
import { FindMeetupOptions } from '../options/find-meetup.options';

export interface IMeetupService {
  createOne(options: CreateMeetupOptions): Promise<Meetup>;

  findMany(options?: FindMeetupOptions, page?: number, count?: number): Promise<Meetup[]>;

  findById(id: number): Promise<Meetup>;

  update(id: number, options: UpdateMeetupOptions): Promise<void>;

  delete(id: number): Promise<void>;
}
