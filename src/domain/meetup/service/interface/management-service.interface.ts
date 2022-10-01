import { CreateMeetupOptions } from '../../entity/options/create-meetup.options';
import { Meetup } from '../../entity/meetup.entity';
import { UpdateMeetupOptions } from '../options/update-meetup.options';

export interface IMeetupManagementService {
  registerMeetup(options: CreateMeetupOptions): Promise<Meetup>;

  cancelMeetup(id: number): Promise<Meetup>;

  editMeetup(id: number, options: UpdateMeetupOptions): Promise<Meetup>;
}
