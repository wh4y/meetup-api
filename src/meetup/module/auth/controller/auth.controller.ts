import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { User } from '../module/user/entity/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { IAuthController } from './interface/auth-controller.interface';
import { AuthedUser } from './decorator/authed-user.decorator';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { UserAlreadyExistsInterceptor } from '../module/user/controller/interceptor/user-already-exists.interceptor';

@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('/auth')
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/signin')
  @UseInterceptors(JwtInterceptor)
  @UseGuards(AuthGuard('local'))
  async signIn(@AuthedUser() user: User): Promise<User> {
    return user;
  }

  @UseInterceptors(
    UserAlreadyExistsInterceptor,
    JwtInterceptor,
  )
  @Post('/signup')
  async signUp(@Body() dto: SignUpDto): Promise<User> {
    return await this.authService.signUp(dto);
  }
}
