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
import { FindMeetupDto } from './dto/find-meetup.dto';
import { MeetupPageResponse } from './response/meetup-page.response';
import { FindMeetupDtoPipe } from './pipe/find-meetup-dto.pipe';
import { MeetupPaginationDto } from './dto/meetup-pagination.dto';
import { PaginationDtoPipe } from './pipe/pagination-dto.pipe';
import { MeetupMapper } from './mapper/meetup/meetup.mapper';
import { Meetup } from '../entity/meetup/meetup.entity';


@UsePipes(new ValidationPipe({ transform: true }))
@Controller('/meetup')
export class MeetupController implements IMeetupController {
  constructor(
    private readonly meetupService: MeetupService,
    private readonly meetupMapper: MeetupMapper,
  ) {
  }

  @Get('/')
  async getMany(
    @Query(new FindMeetupDtoPipe()) findMeetupDto: FindMeetupDto,
    @Query(new PaginationDtoPipe()) { page, count }: MeetupPaginationDto,
  ): Promise<MeetupPageResponse> {
    const meetups = await this.meetupService.findMany(findMeetupDto, page, count);
    const totalCount = await this.meetupService.getTotalCount(findMeetupDto);

    return await this.meetupMapper.mapMeetupsToPage(meetups, totalCount, page);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() dto: RegisterMeetupDto): Promise<Meetup> {
    const meetup = await this.meetupService.registerMeetup({ ...dto });

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
