import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meetup } from './entity/meetup.entity';
import { MeetupService } from './service/meetup.service';
import { MeetupController } from './controller/meetup.controller';
import { MeetupViewService } from './service/meetup-view.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meetup]),
  ],
  providers: [
    MeetupService,
    MeetupViewService,
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
