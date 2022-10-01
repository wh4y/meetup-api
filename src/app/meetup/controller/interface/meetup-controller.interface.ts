import { Meetup } from '../../../../domain/meetup/entity/meetup.entity';
import { RegisterMeetupDto } from '../dto/register-meetup.dto';
import { Response } from 'express';
import { EditMeetupDto } from '../dto/edit-meetup.dto';


export interface IMeetupController {
  getAll(): Promise<Meetup[]>;

  register(dto: RegisterMeetupDto, res: Response): Promise<void>;

  getById(id: number): Promise<Meetup>;

  cancel(id: number, res: Response): Promise<void>;

  edit(id: number, dto: EditMeetupDto, res: Response);
}
