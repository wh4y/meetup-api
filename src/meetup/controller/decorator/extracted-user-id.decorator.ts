import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../module/auth/module/user/entity/user.entity';

export const ExtractedUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User;

    return Number(user.id);
  },
);
