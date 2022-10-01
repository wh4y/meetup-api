import { Meetup } from '../../../../domain/meetup/entity/meetup.entity';
import { RegisterMeetupDto } from '../dto/register-meetup.dto';
import { EditMeetupDto } from '../dto/edit-meetup.dto';


export interface IMeetupController {
  getMany(...args: any[]): Promise<Meetup[]>;

  register(dto: RegisterMeetupDto): Promise<Meetup>;

  getById(id: number): Promise<Meetup>;

  cancel(id: number): Promise<Meetup>;

  edit(id: number, dto: EditMeetupDto): Promise<Meetup>;
}
