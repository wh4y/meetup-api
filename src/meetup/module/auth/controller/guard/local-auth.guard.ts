import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { LOCAL_STRATEGY } from '../strategy/local.strategy';

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOCAL_STRATEGY) {
}
