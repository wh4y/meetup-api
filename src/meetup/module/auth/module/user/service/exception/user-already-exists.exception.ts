export const UserAlreadyExistsMessage = 'User already exists!';

export class UserAlreadyExistsException extends Error {
  constructor() {
    super(UserAlreadyExistsMessage);
  }
}
