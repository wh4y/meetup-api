import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { MeetupModule } from './domain/meetup/meetup.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule.registerAsync(),
    MeetupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
