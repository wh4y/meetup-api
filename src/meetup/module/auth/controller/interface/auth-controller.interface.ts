import { User } from '../../module/user/entity/user.entity';
import { SignUpDto } from '../dto/signup.dto';

export interface IAuthController {
  signIn(user: User): Promise<User>;

  signUp(dto: SignUpDto): Promise<User>;
}
