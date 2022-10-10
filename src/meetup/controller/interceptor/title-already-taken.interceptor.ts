import { CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { TitleAlreadyTakenException } from '../../service/exception/title-already-taken.exception';

@Injectable()
export class TitleAlreadyTakenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((err) => {
          if (err instanceof TitleAlreadyTakenException) throw new ConflictException(err.message);
          else {
            throw err;
          }
        }),
      );
  }
}
