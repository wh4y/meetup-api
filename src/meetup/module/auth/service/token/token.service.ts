import { ITokenService } from './interface/token-service.interface';
import { JwtPayload } from './interface/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../module/user/entity/user.entity';
import { UserService } from '../../module/user/service/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jWTService: JwtService,
    private readonly userService: UserService,
  ) {
  }

  private generateJWT<P extends Object>(payload: P, type: string): string {
    const expiresIn = this.configService.get<string>(`JWT_${type.toUpperCase()}_EXPIRES_IN`);
    const secret = this.configService.get<string>(`JWT_${type.toUpperCase()}_SECRET`);
    return this.jWTService.sign(payload, { expiresIn, secret });
  }

  public generateAccessToken(payload: JwtPayload): string {
    return this.generateJWT(payload, 'ACCESS');
  }

  public generateRefreshToken(payload: JwtPayload): string {
    return this.generateJWT(payload, 'REFRESH');
  }

  public async verifyJWTPayload(payload: JwtPayload): Promise<User | null> {
    return await this.userService.findByEmail(payload.email);
  }
}
