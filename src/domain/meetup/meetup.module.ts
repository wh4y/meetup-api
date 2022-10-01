import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meetup } from './entity/meetup.entity';
import { MeetupService } from './service/meetup.service';
import { MeetupController } from '../../app/meetup/controller/meetup.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meetup]),
  ],
  providers: [
    MeetupService,
  ],
  exports: [
    MeetupService,
  ],
  controllers: [
    MeetupController,
  ],
})
export class MeetupModule {
}
