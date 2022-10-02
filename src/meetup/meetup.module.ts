import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meetup } from './entity/meetup/meetup.entity';
import { MeetupService } from './service/meetup.service';
import { MeetupController } from './controller/meetup.controller';
import { MeetupMapper } from './controller/mapper/meetup/meetup.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meetup]),
  ],
  providers: [
    MeetupMapper,
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
