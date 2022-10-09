import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './controller/strategy/local.strategy';
import { AuthController } from './controller/auth.controller';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessJwtStrategy } from './controller/strategy/access-jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => {
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
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
