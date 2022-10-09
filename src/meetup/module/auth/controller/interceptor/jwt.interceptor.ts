import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from '../../module/user/entity/user.entity';
import { Response } from 'express';
import { TokenService } from '../../service/token/token.service';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(private readonly tokenService: TokenService) {
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<User>,
  ): Observable<User> {
    return next.handle().pipe(
      map(user => {
        const response = context.switchToHttp().getResponse<Response>();
        const token = this.tokenService.generateAccessToken({
          email: user.email,
          sub: String(user.id),
        });

        const currentDatetime = new Date();
        currentDatetime.setMinutes(currentDatetime.getMinutes() + 1);
        const cookieExpiresIn = currentDatetime;

        response.cookie('accessToken', token, {
          httpOnly: true,
          sameSite: 'strict',
          expires: cookieExpiresIn,
        });

        return user;
      }),
    );
  }
}
