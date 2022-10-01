import { Meetup } from '../../../../domain/meetup/entity/meetup.entity';
import { RegisterMeetupDto } from '../dto/register-meetup.dto';
import { EditMeetupDto } from '../dto/edit-meetup.dto';
import { MeetupPageResponse } from '../response/meetup-page.response';
import { MeetupResponse } from '../response/meetup.response';


export interface IMeetupController {
  getMany(...args: any[]): Promise<MeetupPageResponse>;

  register(dto: RegisterMeetupDto): Promise<MeetupResponse>;

  getById(id: number): Promise<MeetupResponse>;

  cancel(id: number): Promise<MeetupResponse>;

  edit(id: number, dto: EditMeetupDto): Promise<MeetupResponse>;
}
