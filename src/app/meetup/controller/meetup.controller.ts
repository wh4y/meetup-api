import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IMeetupController } from './interface/meetup-controller.interface';
import { Meetup } from '../../../domain/meetup/entity/meetup.entity';
import { MeetupService } from '../../../domain/meetup/service/meetup.service';
import { RegisterMeetupDto } from './dto/register-meetup.dto';
import { DatetimeTransformerPipe } from './pipe/datetime-transformer.pipe';
import { EditMeetupDto } from './dto/edit-meetup.dto';
import { MeetupManagementService } from '../../../domain/meetup/service/meetup-management.service';
import { FindMeetupDto } from './dto/find-meetup.dto';


@UsePipes(new ValidationPipe({ transform: true }))
@Controller('/meetup')
export class MeetupController implements IMeetupController {
  constructor(
    private readonly meetupService: MeetupService,
    private readonly meetupManagementService: MeetupManagementService,
  ) {
  }

  @Get('/')
  async getMany(
    @Query() dto: FindMeetupDto,
  ): Promise<Meetup[]> {
    return await this.meetupService.findMany({ ...dto });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(
    @Body(new DatetimeTransformerPipe<RegisterMeetupDto>()) dto: RegisterMeetupDto,
  ): Promise<Meetup> {
    const meetup = await this.meetupManagementService.registerMeetup({ ...dto });

    return meetup;
  }

  @Get('/:id')
  async getById(@Param('id', new ParseIntPipe()) id: number): Promise<Meetup> {
    return await this.meetupService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/cancel/:id')
  async cancel(@Param('id', new ParseIntPipe()) id: number): Promise<Meetup> {
    const meetup = await this.meetupManagementService.cancelMeetup(id);

    return meetup;
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/edit/:id')
  async edit(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new DatetimeTransformerPipe<EditMeetupDto>()) dto: EditMeetupDto,
  ): Promise<Meetup> {
    const meetup = await this.meetupManagementService.editMeetup(id, { ...dto });

    return meetup;
  };
}
