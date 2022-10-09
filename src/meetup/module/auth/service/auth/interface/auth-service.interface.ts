import { SignUpOptions } from '../options/signup.options';
import { SignInOptions } from '../options/signin.options';
import { User } from '../../../module/user/entity/user.entity';

export interface IAuthService {
  signUp(options: SignUpOptions): Promise<User>;

  signIn(options: SignInOptions): Promise<User>;
}
