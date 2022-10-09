import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from '../../module/user/entity/user.entity';
import { Response } from 'express';
import { TokenService } from '../../service/token/token.service';

@Injectable()
export class AttachJwtInterceptor implements NestInterceptor {
  constructor(private readonly tokenService: TokenService) {
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<User>,
  ): Observable<User> {
    return next.handle().pipe(
      map(user => {
        const response = context.switchToHttp().getResponse<Response>();

        const accessToken = this.tokenService.generateAccessToken({
          email: user.email,
          sub: String(user.id),
        });

        response.cookie('accessToken', accessToken, {
          httpOnly: true,
          sameSite: 'strict',
        });

        const refreshToken = this.tokenService.generateRefreshToken({
          email: user.email,
          sub: String(user.id),
        });

        response.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'strict',
        });

        return user;
      }),
    );
  }
}
