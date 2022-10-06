import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { UserNotExistException } from '../../service/exception/user-not-exist.exception';


@Injectable()
export class UserNotExistInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((err, caught) => {
          if (err instanceof UserNotExistException) throw new BadRequestException(err.message);
          else {
            throw err;
          }
        }),
      );
  }
}
