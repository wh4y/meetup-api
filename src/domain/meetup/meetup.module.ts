import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meetup } from './entity/meetup.entity';
import { MeetupService } from './service/meetup.service';
import { MeetupController } from '../../app/meetup/controller/meetup.controller';
import { MeetupManagementService } from './service/meetup-management.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meetup]),
  ],
  providers: [
    MeetupService,
    MeetupManagementService,
  ],
  exports: [
    MeetupService,
    MeetupManagementService,
  ],
  controllers: [
    MeetupController,
  ],
})
export class MeetupModule {
}
