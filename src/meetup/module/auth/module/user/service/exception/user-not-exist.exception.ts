export const UserNotExistMessage = 'User doesn\'t exist!';

export class UserNotExistException extends Error {
  constructor() {
    super(UserNotExistMessage);
  }
}
