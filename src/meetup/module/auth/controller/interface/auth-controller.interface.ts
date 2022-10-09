import { User } from '../../module/user/entity/user.entity';
import { SignUpDto } from '../dto/signup.dto';
import { Response } from 'express';

export interface IAuthController {
  signIn(user: User): Promise<User>;

  signUp(dto: SignUpDto): Promise<User>;

  refreshTokens(user: User, res: Response): Promise<void>;
}
