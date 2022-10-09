import { IAuthService } from './interface/auth-service.interface';
import { Injectable } from '@nestjs/common';
import { User } from '../module/user/entity/user.entity';
import { SignInOptions } from './options/signin.options';
import { SignUpOptions } from './options/signup.options';
import { UserService } from '../module/user/service/user.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../controller/interface/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserAlreadyExistsException } from '../module/user/service/exception/user-already-exists.exception';


@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jWTService: JwtService,
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

  public generateAccessToken(payload: JwtPayload): string {
    const expiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRES_IN');
    const token = this.jWTService.sign(payload, { expiresIn });

    return token;
  }

  public async verifyJWTPayload(payload: JwtPayload): Promise<User | null> {
    return await this.userService.findByEmail(payload.email);
  }
}
