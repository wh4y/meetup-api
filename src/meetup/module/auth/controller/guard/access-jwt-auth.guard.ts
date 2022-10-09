import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ACCESS_JWT_STRATEGY } from '../strategy/access-jwt.strategy';

@Injectable()
export class AccessJwtAuthGuard extends AuthGuard(ACCESS_JWT_STRATEGY) {
}
