import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../service/auth.service';
import { Request } from 'express';
import { User } from '../../module/user/entity/user.entity';
import { SignInDto } from '../dto/signin.dto';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
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
