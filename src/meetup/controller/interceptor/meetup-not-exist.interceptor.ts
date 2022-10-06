import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { MeetupNotExistException } from '../../service/exception/meetup-not-exist.exception';

@Injectable()
export class MeetupNotExistInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((err) => {
          if (err instanceof MeetupNotExistException) throw new BadRequestException(err.message);
          else {
            throw err;
          }
        }),
      );
  }
}
