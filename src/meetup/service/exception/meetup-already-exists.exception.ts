export const MeetupAlreadyExistsMessage = 'Meetup already exists!';

export class MeetupAlreadyExistsException extends Error {
  constructor() {
    super(MeetupAlreadyExistsMessage);
  }
}
