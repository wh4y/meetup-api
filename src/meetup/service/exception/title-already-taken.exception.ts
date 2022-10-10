export const TitleAlreadyTakenMessage = 'Title has already taken!';

export class TitleAlreadyTakenException extends Error {
  constructor() {
    super(TitleAlreadyTakenMessage);
  }
}
