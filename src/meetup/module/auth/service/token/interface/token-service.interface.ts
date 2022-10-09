import { JwtPayload } from './jwt-payload.interface';
import { User } from '../../../module/user/entity/user.entity';

export interface ITokenService {
  generateAccessToken(payload: JwtPayload): string;

  generateRefreshToken(payload: JwtPayload): string;

  generateTokensFromUser(user: User): string[];

  verifyJWTPayload(payload: JwtPayload): Promise<User | null>;
}
