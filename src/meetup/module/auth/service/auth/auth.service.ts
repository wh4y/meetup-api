import { IAuthService } from './interface/auth-service.interface';
import { Injectable } from '@nestjs/common';
import { User } from '../../module/user/entity/user.entity';
import { SignInOptions } from './options/signin.options';
import { SignUpOptions } from './options/signup.options';
import { UserService } from '../../module/user/service/user.service';
import * as bcrypt from 'bcrypt';
import { UserAlreadyExistsException } from '../../module/user/service/exception/user-already-exists.exception';


@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  private async validatePassword(passwordToValidate: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(passwordToValidate, hashedPassword);
  }

  public async signIn(options: SignInOptions): Promise<User> {
    const user = await this.userService.findByEmail(options.email);
    if (!user) return null;

    const isPasswordValid = await this.validatePassword(options.password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  public async signUp(options: SignUpOptions): Promise<User> {
    const existingUser = await this.userService.findByEmail(options.email);
    if (existingUser) throw new UserAlreadyExistsException();

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(options.password, salt);

    const user = await this.userService.create({ ...options, password: hashedPassword });
    return user;
  }
}
