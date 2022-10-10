import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../service/auth/auth.service';
import { Request } from 'express';
import { User } from '../../module/user/entity/user.entity';
import { SignInDto } from '../dto/signin.dto';
import { plainToInstance } from 'class-transformer';
import { validate as validateDto } from 'class-validator';
import { throttle } from 'rxjs';

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
    const dto: SignInDto = plainToInstance(SignInDto, req.body);
    await validateDto(dto).then((errors) => {
      let messages = [];
      errors.forEach(error => messages.push(...Object.values(error.constraints)));
      if (messages.length) throw new BadRequestException(messages);
    });

    return await this.authService.signIn(dto);
  }
}
