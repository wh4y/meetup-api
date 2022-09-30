import { CreateMeetupOptions } from '../../entity/options/create-meetup.options';
import { Meetup } from '../../entity/meetup.entity';

export interface IMeetupService {
  createOne(options: CreateMeetupOptions): Promise<Meetup>;

  findAll(): Promise<Meetup[]>;

  findById(id: number): Promise<Meetup>;

  update(updatedMeetup: Meetup): Promise<void>;

  delete(id: string): Promise<void>;
}
