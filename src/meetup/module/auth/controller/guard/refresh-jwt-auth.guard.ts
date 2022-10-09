import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { REFRESH_JWT_STRATEGY } from '../strategy/refresh-jwt.strategy';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard(REFRESH_JWT_STRATEGY) {
}
