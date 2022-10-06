import {
  Body,
  ClassSerializerInterceptor,
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
  UseGuards,
  UseInterceptors,
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
import { AuthGuard } from '@nestjs/passport';
import { ExtractedUserId } from './decorator/extracted-user-id.decorator';
import { MeetupNotExistInterceptor } from './interceptor/meetup-not-exist.interceptor';
import { MeetupAlreadyExistsInterceptor } from './interceptor/meetup-already-exists.interceptor';
import { GuestAlreadyRegisteredInterceptor } from './interceptor/guest-already-registered.interceptor';
import { GuestNotRegisteredInterceptor } from './interceptor/guest-not-registered.interceptor';
import { UserNotExistInterceptor } from '../module/auth/module/user/controller/interceptor/user-not-exist.interceptor';


@UseInterceptors(ClassSerializerInterceptor)
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

  @UseInterceptors(MeetupAlreadyExistsInterceptor)
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

  @UseInterceptors(MeetupNotExistInterceptor)
  @HttpCode(HttpStatus.OK)
  @Delete('/cancel/:id')
  async cancel(@Param('id', new ParseIntPipe()) id: number): Promise<Meetup> {
    const meetup = await this.meetupService.cancelMeetup(id);

    return meetup;
  }

  @UseInterceptors(MeetupNotExistInterceptor)
  @HttpCode(HttpStatus.OK)
  @Patch('/edit/:id')
  async edit(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: EditMeetupDto,
  ): Promise<Meetup> {
    const meetup = await this.meetupService.editMeetup(id, { ...dto });

    return meetup;
  };


  @UseInterceptors(
    MeetupNotExistInterceptor,
    GuestAlreadyRegisteredInterceptor,
    UserNotExistInterceptor,
  )
  @HttpCode(HttpStatus.OK)
  @Post('/register-guest-for-meetup/:meetupId')
  @UseGuards(AuthGuard('jwt'))
  async registerGuestForMeetup(
    @Param('meetupId', new ParseIntPipe()) meetupId: number,
    @ExtractedUserId() userId: number,
  ): Promise<void> {
    await this.meetupService.registerGuestForMeetup(meetupId, userId);
  }

  @UseInterceptors(
    MeetupNotExistInterceptor,
    GuestNotRegisteredInterceptor,
    UserNotExistInterceptor,
  )
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/unregister-guest-for-meetup/:meetupId')
  @UseGuards(AuthGuard('jwt'))
  async unregisterGuestForMeetup(
    @Param('meetupId', new ParseIntPipe()) meetupId: number,
    @ExtractedUserId() userId: number,
  ): Promise<void> {
    await this.meetupService.unregisterGuestForMeetup(meetupId, userId);
  }
}
