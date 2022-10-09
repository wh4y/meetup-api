import { Cookie } from './class/cookie';
import { CookieOptions } from 'express';

const options: CookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  path: '/api/v1/auth/refresh-tokens',
};

const name = 'refreshToken';

export class RefreshTokenCookie extends Cookie<string> {
  constructor(public readonly value: string) {
    super(name, value, options);
  }
}
