import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meetup } from './entity/meetup/meetup.entity';
import { MeetupService } from './service/meetup.service';
import { MeetupController } from './controller/meetup.controller';
import { MeetupPaginationService } from './service/meetup-pagination.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meetup]),
  ],
  providers: [
    MeetupService,
    MeetupPaginationService,
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
