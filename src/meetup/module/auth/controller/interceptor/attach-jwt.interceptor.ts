import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from '../../module/user/entity/user.entity';
import { Response } from 'express';
import { TokenService } from '../../service/token/token.service';
import { AccessTokenCookie } from '../cookie/access-token.cookie';
import { RefreshTokenCookie } from '../cookie/refresh-token.cookie';

@Injectable()
export class AttachJwtInterceptor implements NestInterceptor {
  constructor(
    private readonly tokenService: TokenService
  ) {
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<User>,
  ): Observable<User> {
    return next.handle().pipe(
      map(user => {
        const res = context.switchToHttp().getResponse<Response>();

        const jWTPayload = { email: user.email, sub: String(user.id) };
        const newAccessToken = this.tokenService.generateAccessToken(jWTPayload);
        const newRefreshToken = this.tokenService.generateRefreshToken(jWTPayload);

        const accessTokenCookie = new AccessTokenCookie(newAccessToken);
        const refreshTokenCookie = new RefreshTokenCookie(newRefreshToken);

        res.cookie(accessTokenCookie.name, accessTokenCookie.val, accessTokenCookie.options);
        res.cookie(refreshTokenCookie.name, refreshTokenCookie.val, refreshTokenCookie.options);

        return user;
      }),
    );
  }
}
