import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from './queries/get-user.query';
import { User } from '../../../entities/identity/user.entity';
import {
  UpdateUserRefreshTokenCommand,
  UpdateUserRefreshTokenRequest,
} from './commands/update-user-refresh-token.command';

@Controller('user')
export class UserController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {
  }

  @Get('/get-all')
  async getAllUsers(@Query() username: string): Promise<User> {
    return await this.queryBus.execute(new GetUserQuery(username));
  }

  @Post('update-refresh-token/:id')
  async UpdateUserRefreshToken(@Param('id') userId: number,
                               @Body() request: UpdateUserRefreshTokenRequest) {
    return await this.commandBus.execute(new UpdateUserRefreshTokenCommand(userId, request));
  }
}
