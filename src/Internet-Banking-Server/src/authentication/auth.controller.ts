import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoginUserCommand, LoginUserRequest } from '../identity/user/commands/login-user.command';
import { RegisterUserCommand, RegisterUserRequest } from '../identity/user/commands/register-user.command';
import {
  UpdateUserRefreshTokenCommand,
  UpdateUserRefreshTokenRequest,
} from '../identity/user/commands/update-user-refresh-token.command';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {

  }

  @Post('/login')
  @ApiOperation({ summary: 'login user endpoint' })
  async login(@Body() request: LoginUserRequest) {
    return await this.commandBus.execute(new LoginUserCommand(request));
  }

  @Post('/register')
  @ApiOperation({ summary: 'register user endpoint' })
  async register(@Body() request: RegisterUserRequest) {
    return await this.commandBus.execute(new RegisterUserCommand(request));
  }

  @ApiBearerAuth()
  @Get('/refresh')
  @UseGuards(RefreshTokenGuard)
  refreshTokens(@Req() req: Request) {
    const { user } = req;
    const userId : number = user['sub'];
    const refreshToken : string = req.user['refreshToken'];
    return this.commandBus.execute(new UpdateUserRefreshTokenCommand(userId, new UpdateUserRefreshTokenRequest(refreshToken)));
  }
}
