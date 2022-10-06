import {
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { GuestAlreadyRegisteredException } from '../../service/exception/guest-already-registered.exception';

@Injectable()
export class GuestAlreadyRegisteredInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((err) => {
          if (err instanceof GuestAlreadyRegisteredException) throw new ConflictException(err.message);
          else {
            throw err;
          }
        }),
      );
  }
}
