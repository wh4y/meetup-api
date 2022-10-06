export const GuestNotRegisteredMessage = 'Guest hasn\'t registered for this meetup!';

export class GuestNotRegisteredException extends Error {
  constructor() {
    super(GuestNotRegisteredMessage);
  }
}
