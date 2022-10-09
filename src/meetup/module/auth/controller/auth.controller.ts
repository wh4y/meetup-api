import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth/auth.service';
import { User } from '../module/user/entity/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { IAuthController } from './interface/auth-controller.interface';
import { AuthedUser } from './decorator/authed-user.decorator';
import { AttachJwtInterceptor } from './interceptor/attach-jwt.interceptor';
import { UserAlreadyExistsInterceptor } from '../module/user/controller/interceptor/user-already-exists.interceptor';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { TokenService } from '../service/token/token.service';
import { Response } from 'express';
import { AccessTokenCookie } from './cookie/access-token.cookie';
import { RefreshTokenCookie } from './cookie/refresh-token.cookie';


@ApiTags('Auth')
@UseInterceptors(
  ClassSerializerInterceptor,
  UserAlreadyExistsInterceptor,
)
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('/auth')
export class AuthController implements IAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {
  }

  @ApiBody({ type: SignInDto })
  @ApiOkResponse({
    description: 'Successfully signed in!',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  @UseInterceptors(AttachJwtInterceptor)
  @UseGuards(AuthGuard('local'))
  public async signIn(@AuthedUser() user: User): Promise<User> {
    return user;
  }

  @ApiBody({ type: SignUpDto })
  @ApiCreatedResponse({
    description: 'Successfully signed up!',
    type: User,
  })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    AttachJwtInterceptor,
  )
  @Post('/signup')
  public async signUp(@Body() dto: SignUpDto): Promise<User> {
    return await this.authService.signUp(dto);
  }

  @ApiNoContentResponse({
    description: 'New tokens attached as cookies!',
    type: null,
  })
  @ApiCookieAuth('accessToken')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('refresh-jwt'))
  @Get('/refresh-tokens')
  public async refreshTokens(@AuthedUser() user: User, @Res() res: Response): Promise<void> {
    const [newAccessToken, newRefreshToken] = this.tokenService.generateTokensFromUser(user);

    const accessTokenCookie = new AccessTokenCookie(newAccessToken);
    const refreshTokenCookie = new RefreshTokenCookie(newRefreshToken);

    res.cookie(accessTokenCookie.name, accessTokenCookie.val, accessTokenCookie.options);
    res.cookie(refreshTokenCookie.name, refreshTokenCookie.val, refreshTokenCookie.options);

    res.end();
  }
}
