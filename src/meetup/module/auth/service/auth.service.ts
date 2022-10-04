import { IAuthService } from './interface/auth-service.interface';
import { Injectable } from '@nestjs/common';
import { User } from '../module/user/entity/user.entity';
import { SignInOptions } from './options/signin.options';
import { SignUpOptions } from './options/signup.options';

@Injectable()
export class AuthService implements IAuthService {
  signIn(options: SignInOptions): Promise<User> {
    return Promise.resolve(undefined);
  }

  signUp(options: SignUpOptions): Promise<User> {
    return Promise.resolve(undefined);
  }
}
