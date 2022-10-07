import { CreateMeetupOptions } from '../../entity/meetup/options/create-meetup.options';
import { Meetup } from '../../entity/meetup/meetup.entity';
import { UpdateMeetupOptions } from '../options/update-meetup.options';
import { FindMeetupOptions } from '../options/find-meetup.options';

export interface IMeetupService {
  registerMeetup(options: CreateMeetupOptions): Promise<Meetup>;

  findMany(options?: FindMeetupOptions, page?: number, count?: number): Promise<Meetup[]>;

  findById(id: number): Promise<Meetup>;

  editMeetup(id: number, options: UpdateMeetupOptions): Promise<Meetup>;

  cancelMeetup(id: number): Promise<Meetup>;

  getTotalCount(options?: FindMeetupOptions): Promise<number>;

  registerGuestForMeetup(meetupId: number, userId: number): Promise<void>;

  unregisterGuestForMeetup(meetupId: number, userId: number): Promise<void>;

  isUserOrganizerOfMeetup(meetupId, userId): Promise<boolean>;
}
