import { Repository } from 'typeorm';
import { Meetup } from '../entity/meetup.entity';

export class MeetupRepository extends Repository<Meetup> {
}
