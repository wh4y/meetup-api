import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ExcludePasswordInterceptor<Target extends Object> implements NestInterceptor {
  private deletePasswordRecursively(target: Target): void {
    for (let prop of Object.keys(target)) {
      if (target[prop] instanceof Object) this.deletePasswordRecursively(target[prop]);
      if (prop === 'password') Reflect.deleteProperty(target, 'password');
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<Omit<Target, 'password'>> {
    return next.handle()
      .pipe(
        map((data: Target) => {
          this.deletePasswordRecursively(data);
          return data;
        }),
      );
  }
}
