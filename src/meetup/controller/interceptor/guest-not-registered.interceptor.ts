import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { GuestNotRegisteredException } from '../../service/exception/guest-not-registered.exception';

@Injectable()
export class GuestNotRegisteredInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((err) => {
          if (err instanceof GuestNotRegisteredException) throw new BadRequestException(err.message);
          else {
            throw err;
          }
        }),
      );
  }
}
