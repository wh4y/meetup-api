import {
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { UserAlreadyExistsException } from '../../service/exception/user-already-exists.exception';


@Injectable()
export class UserAlreadyExistsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((err, caught) => {
          if (err instanceof UserAlreadyExistsException) throw new ConflictException(err.message);
          else {
            throw err;
          }
        }),
      );
  }
}
