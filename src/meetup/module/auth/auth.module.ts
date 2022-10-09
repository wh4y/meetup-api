import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AuthService } from './service/auth/auth.service';
import { LocalStrategy } from './controller/strategy/local.strategy';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessJwtStrategy } from './controller/strategy/access-jwt.strategy';
import { TokenService } from './service/token/token.service';
import { RefreshJwtStrategy } from './controller/strategy/refresh-jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule,
  ],
  exports: [
    UserModule,
  ],
  providers: [
    AuthService,
    TokenService,
    LocalStrategy,
    AccessJwtStrategy,
    RefreshJwtStrategy,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {
}
