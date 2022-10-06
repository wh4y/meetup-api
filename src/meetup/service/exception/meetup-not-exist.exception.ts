export const MeetupNotExistMessage = 'Meetup doesn\'t exist!';
export class MeetupNotExistException extends Error {
  constructor() {
    super(MeetupNotExistMessage);
  }
}
