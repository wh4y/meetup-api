import { Request } from 'express';
import { JwtFromRequestFunction } from 'passport-jwt';

const extractJwtFromCookies = (cookie: string) => ((req: Request) => {
  return req.cookies[cookie];
}) as JwtFromRequestFunction;

export default extractJwtFromCookies;
