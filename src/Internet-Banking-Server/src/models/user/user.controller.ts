import { Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from './queries/get-user.query';
import { User } from '../../entities/user.entity';
import { UpdateUserRefreshTokenCommand } from './commands/update-user-refresh-token.command';

@Controller('user')
export class UserController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {
  }

  @Get('/get-all')
  async getAllUsers(username: string) : Promise<User> {
    return await this.queryBus.execute(new GetUserQuery(username));
  }

  @Post('update-refresh-token')
  async UpdateUserRefreshToken() {
    return await this.commandBus.execute(new UpdateUserRefreshTokenCommand());
  }
}
