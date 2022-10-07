import { Meetup } from '../../../../../../entity/meetup/meetup.entity';

export interface CreateUserOptions {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  signedMeetups?: Meetup[];
  registeredMeetups?: Meetup[];
}
