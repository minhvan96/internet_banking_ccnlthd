import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { RefreshTokenGuard } from "./guards/refreshToken.guard";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { LoginUserCommand, LoginUserRequest } from "../identity/user/commands/login-user.command";
import { RegisterUserCommand, RegisterUserRequest } from "../identity/user/commands/register-user.command";
import {
  UpdateUserRefreshTokenCommand,
  UpdateUserRefreshTokenRequest
} from "../identity/user/commands/update-user-refresh-token.command";
import { VerifyUserCommand, VerifyUserRequest } from "../identity/user/commands/verify-user.command";
import {
  ChangeCurrentUserPasswordRequest, ChangeUserPasswordCommand,
  ChangeUserPasswordRequest
} from "../identity/user/commands/change-user-password.command";
import {
  ForgotUserPasswordCommand,
  ForgotUserPasswordRequest
} from "../identity/user/commands/forgot-user-password.command";
import { AccessTokenGuard } from "./guards/access-token.guard";
import {
  ChangeUserPasswordByCodeCommand,
  ChangeUserPasswordByCodeRequest
} from "../identity/user/commands/change-user-password-by-code.command";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus) {

  }

  @Post("/login")
  @ApiOperation({ summary: "login user endpoint" })
  async login(@Body() request: LoginUserRequest) {
    return await this.commandBus.execute(new LoginUserCommand(request));
  }

  @Post("/register")
  @ApiOperation({ summary: "register user endpoint" })
  async register(@Body() request: RegisterUserRequest) {
    return await this.commandBus.execute(new RegisterUserCommand(request));
  }

  @Post("/verify")
  @ApiOperation({ summary: "verify user endpoint" })
  async verify(@Body() request: VerifyUserRequest) {
    return await this.commandBus.execute(new VerifyUserCommand(request));
  }

  @ApiBearerAuth()
  @Get("/refresh")
  @UseGuards(RefreshTokenGuard)
  refreshTokens(@Req() req: Request) {
    const { user } = req;
    const userId: number = user["sub"];
    const refreshToken: string = req.user["refreshToken"];
    return this.commandBus.execute(new UpdateUserRefreshTokenCommand(userId, new UpdateUserRefreshTokenRequest(refreshToken)));
  }

  @ApiBearerAuth()
  @Post("/change-password")
  @ApiOperation({ summary: "Change user password" })
  @UseGuards(AccessTokenGuard)
  async changeUserPassword(
    @Req() req: Request,
    @Body() request: ChangeCurrentUserPasswordRequest
  ) {
    const { user } = req;
    const userId: number = user["sub"];
    return this.commandBus.execute(new ChangeUserPasswordCommand(new ChangeUserPasswordRequest(userId, request.newPassword)));
  }

  @Post("/forgot-password")
  @ApiOperation({ summary: "Forgot user password" })
  async forgotUserPassword(
    @Body() request: ForgotUserPasswordRequest
  ) {
    return this.commandBus.execute(new ForgotUserPasswordCommand(request));
  }

  @Post("/change-password-by-otp")
  @ApiOperation({ summary: "Change user password by otp" })
  async changeUserPasswordByOtp(
    @Body() request: ChangeUserPasswordByCodeRequest
  ) {
    return this.commandBus.execute(new ChangeUserPasswordByCodeCommand(request));
  }
}
