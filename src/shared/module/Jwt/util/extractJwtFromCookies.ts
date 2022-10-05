import { Request } from 'express';
import { JwtFromRequestFunction } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';

const extractJwtFromCookies = (cookie: string) => ((req: Request) => {
  const cookies = req.headers.cookie;
  if (!cookies) throw new UnauthorizedException();

  const token = cookies
    .split(' ')
    .filter((item) => item.includes(cookie))
    .pop()
    .replace(new RegExp(`${cookie}=`), '')
    .replace(/;/, '');

  return token;
}) as JwtFromRequestFunction;

export default extractJwtFromCookies;
