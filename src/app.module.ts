import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { MeetupModule } from './domain/meetup/meetup.module';
import * as Joi from 'joi';
import { AppMeetupModule } from './app/meetup/app-meetup.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number().port().required(),
        DB_DIALECT: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().port().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    DatabaseModule.registerAsync(),
    AppMeetupModule,
  ],
})
export class AppModule {
}
