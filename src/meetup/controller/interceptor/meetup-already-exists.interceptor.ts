import {
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { MeetupNotExistException } from '../../service/exception/meetup-not-exist.exception';
import { MeetupAlreadyExistsException } from '../../service/exception/meetup-already-exists.exception';

@Injectable()
export class MeetupAlreadyExistsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((err) => {
          if (err instanceof MeetupAlreadyExistsException) throw new ConflictException(err.message);
          else {
            throw err;
          }
        }),
      );
  }
}
