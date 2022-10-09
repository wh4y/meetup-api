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
    private readonly tokenService: TokenService,
  ) {
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<User>,
  ): Observable<User> {
    return next.handle().pipe(
      map(user => {
        const res = context.switchToHttp().getResponse<Response>();

        const [accessToken, refreshToken] = this.tokenService.generateTokensFromUser(user);

        const accessTokenCookie = new AccessTokenCookie(accessToken);
        const refreshTokenCookie = new RefreshTokenCookie(refreshToken);

        res.cookie(accessTokenCookie.name, accessTokenCookie.val, accessTokenCookie.options);
        res.cookie(refreshTokenCookie.name, refreshTokenCookie.val, refreshTokenCookie.options);

        return user;
      }),
    );
  }
}
