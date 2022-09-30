import { Repository } from 'typeorm';
import { Meetup } from '../../../domain/meetup/entity/meetup.entity';

export class MeetupRepository extends Repository<Meetup> {
}
