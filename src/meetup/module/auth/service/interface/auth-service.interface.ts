import { SignUpOptions } from '../options/signup.options';
import { SignInOptions } from '../options/signin.options';
import { User } from '../../module/user/entity/user.entity';
import { JwtPayload } from '../../controller/interface/jwt-payload.interface';

export interface IAuthService {
  signUp(options: SignUpOptions): Promise<User>;

  signIn(options: SignInOptions): Promise<User>;

  generateAccessToken(payload: JwtPayload): string;

  generateRefreshToken(payload: JwtPayload): string;

  verifyJWTPayload(payload: JwtPayload): Promise<User | null>;
}
