import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Res } from '@nestjs/common';
import { IMeetupController } from './interface/meetup-controller.interface';
import { Response } from 'express';
import { Meetup } from '../../../domain/meetup/entity/meetup.entity';
import { MeetupService } from '../../../domain/meetup/service/meetup.service';
import { RegisterMeetupDto } from './dto/register-meetup.dto';
import { DatetimeTransformerPipe } from './pipe/datetime-transformer.pipe';
import { EditMeetupDto } from './dto/edit-meetup.dto';

@Controller('/meetup')
export class MeetupController implements IMeetupController {
  constructor(
    private readonly meetupService: MeetupService,
  ) {
  }

  @Get('/all')
  async getAll(): Promise<Meetup[]> {
    return await this.meetupService.findAll();
  }

  @Post('/register')
  async register(
    @Body(new DatetimeTransformerPipe<RegisterMeetupDto>()) dto: RegisterMeetupDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.meetupService.createOne({ ...dto });

    res.statusCode = HttpStatus.CREATED;
    res.end();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseIntPipe()) id: number): Promise<Meetup> {
    return await this.meetupService.findById(id);
  }

  @Delete('/cancel/:id')
  async cancel(@Param('id', new ParseIntPipe()) id: number, @Res() res: Response): Promise<void> {
    await this.meetupService.delete(id);

    res.statusCode = HttpStatus.NO_CONTENT;
    res.end();
  }

  @Patch('/edit/:id')
  async edit(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new DatetimeTransformerPipe<EditMeetupDto>()) dto: EditMeetupDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.meetupService.update(id, dto);

    res.statusCode = HttpStatus.NO_CONTENT;
    res.end();
  };
}
