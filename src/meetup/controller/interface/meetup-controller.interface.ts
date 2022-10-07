import { RegisterMeetupDto } from '../dto/register-meetup.dto';
import { EditMeetupDto } from '../dto/edit-meetup.dto';
import { MeetupPageResponse } from '../response/meetup-page.response';
import { Meetup } from '../../entity/meetup/meetup.entity';


export interface IMeetupController {
  getMany(...args: any[]): Promise<MeetupPageResponse>;

  register(dto: RegisterMeetupDto, organizerId: number): Promise<Meetup>;

  getById(id: number): Promise<Meetup>;

  cancel(meetupId: number, organizerId: number): Promise<Meetup>;

  edit(meetupId: number, organizerId: number, dto: EditMeetupDto): Promise<Meetup>;

  registerGuestForMeetup(meetupId: number, userId: number): Promise<void>;

  unregisterGuestForMeetup(meetupId: number, userId: number): Promise<void>;
}
