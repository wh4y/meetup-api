import { IUserController } from './interface/user-controller.interface';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('/user')
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('/:id')
  async findById(@Param('id', new ParseIntPipe()) id: number): Promise<unknown> {
    return await this.userService.findById(id);
  }

  @Get('/')
  async findMany(dto?: unknown): Promise<unknown> {
    return await this.userService.findMany(dto);
  }
}
