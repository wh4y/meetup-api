import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './controller/strategy/local.strategy';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessJwtStrategy } from './controller/strategy/access-jwt.strategy';

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
    LocalStrategy,
    AccessJwtStrategy,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {
}
