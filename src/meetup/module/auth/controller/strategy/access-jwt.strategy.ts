import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../module/user/entity/user.entity';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { AuthService } from '../../service/auth.service';
import extractJwtFromCookies from '../../../../../shared/module/auth/Jwt/util/extractJwtFromCookies';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'access-jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: extractJwtFromCookies('accessToken'),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {

    return await this.authService.verifyJWTPayload(payload);
  }
}
