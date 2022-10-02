import { Repository } from 'typeorm';
import { Meetup } from '../entity/meetup/meetup.entity';

export class MeetupRepository extends Repository<Meetup> {
}
