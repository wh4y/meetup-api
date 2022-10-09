import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../module/user/entity/user.entity';
import { JwtPayload } from '../../service/token/interface/jwt-payload.interface';
import extractJwtFromCookies from '../../../../../shared/module/auth/Jwt/util/extractJwtFromCookies';
import { TokenService } from '../../service/token/token.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: extractJwtFromCookies('refreshToken'),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return await this.tokenService.verifyJWTPayload(payload);
  }
}
