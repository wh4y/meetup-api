import { IAuthService } from './interface/auth-service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService implements IAuthService {
  signIn(options: unknown): Promise<unknown> {
    return Promise.resolve(undefined);
  }

  signUp(options: unknown): Promise<unknown> {
    return Promise.resolve(undefined);
  }
}
