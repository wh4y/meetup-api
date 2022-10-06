export const GuestAlreadyRegisteredMessage = 'Guest has already registered for this meetup!';

export class GuestAlreadyRegisteredException extends Error {
  constructor() {
    super(GuestAlreadyRegisteredMessage);
  }
}
