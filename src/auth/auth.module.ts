import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    UserModule,
  ],
  exports: [
    UserModule,
  ],
})
export class AuthModule {
}
