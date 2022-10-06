import { Meetup } from '../../entity/meetup/meetup.entity';
import { ApiProperty } from '@nestjs/swagger';

export class MeetupPageResponse {
  @ApiProperty({ type: [Meetup] })
  public meetups: Meetup[];

  @ApiProperty()
  public pageNumber: number;

  @ApiProperty()
  public totalCount: number;
}
