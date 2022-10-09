import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../service/auth/auth.service';
import { Request } from 'express';
import { User } from '../../module/user/entity/user.entity';
import { SignInDto } from '../dto/signin.dto';

export const LOCAL_STRATEGY = 'LOCAL_STRATEGY';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_STRATEGY) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(req: Request): Promise<User> {
    const dto: SignInDto = req.body;
    return await this.authService.signIn(dto);
  }
}
