import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meetup } from './entity/meetup.entity';
import { MeetupService } from './service/meetup.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meetup]),
  ],
  providers: [
    MeetupService,
  ],
  exports: [
    MeetupService,
  ]
})
export class MeetupModule {
}
