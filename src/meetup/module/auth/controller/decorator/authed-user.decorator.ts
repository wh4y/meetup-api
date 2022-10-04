import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../module/user/entity/user.entity';

export const AuthedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as User;
  },
);
