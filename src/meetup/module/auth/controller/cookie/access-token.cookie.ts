import { Cookie } from '../../../../../shared/module/cookie/class/cookie';
import { CookieOptions } from 'express';

const options: CookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
};

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export class AccessTokenCookie extends Cookie<string> {
  constructor(public readonly value: string) {
    super(ACCESS_TOKEN, value, options);
  }
}
