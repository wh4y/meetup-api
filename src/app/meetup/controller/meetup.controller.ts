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
import { EditMeetupDto } from './dto/edit-meetup.dto';
import { FindMeetupDto } from './dto/find-meetup.dto';


@UsePipes(new ValidationPipe({ transform: true }))
@Controller('/meetup')
export class MeetupController implements IMeetupController {
  constructor(
    private readonly meetupService: MeetupService,
  ) {
  }

  @Get('/')
  async getMany(
    @Query() dto: FindMeetupDto,
  ): Promise<Meetup[]> {
    const findMeetupOptions = { ...dto };
    Reflect.deleteProperty(findMeetupOptions, 'page');
    Reflect.deleteProperty(findMeetupOptions, 'count');

    return await this.meetupService.findMany(findMeetupOptions, dto.page, dto.count);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() dto: RegisterMeetupDto): Promise<Meetup> {
    const findMeetupOptions = { ...dto };
    const meetup = await this.meetupService.registerMeetup(findMeetupOptions);

    return meetup;
  }

  @Get('/:id')
  async getById(@Param('id', new ParseIntPipe()) id: number): Promise<Meetup> {
    return await this.meetupService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/cancel/:id')
  async cancel(@Param('id', new ParseIntPipe()) id: number): Promise<Meetup> {
    const meetup = await this.meetupService.cancelMeetup(id);

    return meetup;
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/edit/:id')
  async edit(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: EditMeetupDto,
  ): Promise<Meetup> {
    const meetup = await this.meetupService.editMeetup(id, { ...dto });

    return meetup;
  };
}
