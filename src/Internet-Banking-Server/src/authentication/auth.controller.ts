import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CommandBus } from '@nestjs/cqrs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: 'This API is user login' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  refreshTokens(@Req() req: Request) {
    const { user } = req;
    const userName = user['username'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userName, refreshToken);
  }
}
