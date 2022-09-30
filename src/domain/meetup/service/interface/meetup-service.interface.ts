import { CreateMeetupOptions } from '../../entity/options/create-meetup.options';
import { Meetup } from '../../entity/meetup.entity';
import { UpdateMeetupOptions } from '../options/update-meetup.options';

export interface IMeetupService {
  createOne(options: CreateMeetupOptions): Promise<Meetup>;

  findAll(): Promise<Meetup[]>;

  findById(id: number): Promise<Meetup>;

  update(id: number, options: UpdateMeetupOptions): Promise<void>;

  delete(id: number): Promise<void>;
}
