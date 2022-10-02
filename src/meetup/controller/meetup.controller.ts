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
import { MeetupService } from '../service/meetup.service';
import { RegisterMeetupDto } from './dto/register-meetup.dto';
import { EditMeetupDto } from './dto/edit-meetup.dto';
import { FindMeetupsDto } from './dto/find-meetups.dto';
import { MeetupResponse } from './response/meetup.response';
import { MeetupPageResponse } from './response/meetup-page.response';
import { MeetupViewService } from '../service/meetup-view.service';


@UsePipes(new ValidationPipe({ transform: true }))
@Controller('/meetup')
export class MeetupController implements IMeetupController {
  constructor(
    private readonly meetupService: MeetupService,
    private readonly meetupViewService: MeetupViewService,
  ) {
  }

  @Get('/')
  async getMany(@Query() dto: FindMeetupsDto): Promise<MeetupPageResponse> {
    const page = await this.meetupViewService.getPage({ ...dto });

    return page;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() dto: RegisterMeetupDto): Promise<MeetupResponse> {
    const meetup = await this.meetupService.registerMeetup({ ...dto });

    return meetup;
  }

  @Get('/:id')
  async getById(@Param('id', new ParseIntPipe()) id: number): Promise<MeetupResponse> {
    return await this.meetupService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/cancel/:id')
  async cancel(@Param('id', new ParseIntPipe()) id: number): Promise<MeetupResponse> {
    const meetup = await this.meetupService.cancelMeetup(id);

    return meetup;
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/edit/:id')
  async edit(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: EditMeetupDto,
  ): Promise<MeetupResponse> {
    const meetup = await this.meetupService.editMeetup(id, { ...dto });

    return meetup;
  };
}
