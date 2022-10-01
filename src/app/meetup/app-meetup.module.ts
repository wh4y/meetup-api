import { Module } from '@nestjs/common';
import { MeetupModule } from '../../domain/meetup/meetup.module';
import { MeetupController } from './controller/meetup.controller';
import { MeetupViewService } from './service/meetup-view.service';

@Module({
  imports: [
    MeetupModule,
  ],
  controllers: [
    MeetupController,
  ],
  providers: [
    MeetupViewService,
  ],
})
export class AppMeetupModule {
}
