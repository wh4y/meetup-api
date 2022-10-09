import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../module/user/entity/user.entity';
import { JwtPayload } from '../../service/token/interface/jwt-payload.interface';
import extractJwtFromCookies from '../../../../../shared/module/auth/Jwt/util/extractJwtFromCookies';
import { TokenService } from '../../service/token/token.service';
import { ACCESS_TOKEN } from '../cookie/access-token.cookie';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'access-jwt') {
  constructor(
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: extractJwtFromCookies(ACCESS_TOKEN),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {

    return await this.tokenService.verifyJWTPayload(payload);
  }
}
