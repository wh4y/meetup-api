import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../module/user/entity/user.entity';
import { JwtPayload } from '../../service/token/interface/jwt-payload.interface';
import extractJwtFromCookies from '../../../../../shared/module/auth/Jwt/util/extractJwtFromCookies';
import { TokenService } from '../../service/token/token.service';
import { REFRESH_TOKEN } from '../cookie/refresh-token.cookie';

export const REFRESH_JWT_STRATEGY = 'REFRESH_JWT_STRATEGY';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, REFRESH_JWT_STRATEGY) {
  constructor(
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: extractJwtFromCookies(REFRESH_TOKEN),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return await this.tokenService.verifyJWTPayload(payload);
  }
}
