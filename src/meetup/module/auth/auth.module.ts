import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './controller/strategy/local.strategy';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    UserModule,
  ],
  exports: [
    UserModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {
}
