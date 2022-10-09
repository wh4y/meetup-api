import { Cookie } from '../../../../../shared/module/cookie/class/cookie';
import { CookieOptions } from 'express';

const options: CookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
};

const name = 'accessToken';

export class AccessTokenCookie extends Cookie<string> {
  constructor(public readonly value: string) {
    super(name, value, options);
  }
}
