import { IUserController } from './interface/user-controller.interface';
import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('/user')
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('/:id')
  async getById(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return await this.userService.findById(id);
  }

  @Get('/')
  async getMany(dto?: unknown): Promise<unknown> {
    return await this.userService.findMany(dto);
  }
}
