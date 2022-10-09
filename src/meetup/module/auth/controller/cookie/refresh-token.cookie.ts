import { Cookie } from '../../../../../shared/module/cookie/class/cookie';
import { CookieOptions } from 'express';

const options: CookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  path: '/api/v1/auth/refresh-tokens',
};

export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export class RefreshTokenCookie extends Cookie<string> {
  constructor(public readonly value: string) {
    super(REFRESH_TOKEN, value, options);
  }
}
