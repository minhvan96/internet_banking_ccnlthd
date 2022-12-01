import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  UpdateUserRefreshTokenCommand,
  UpdateUserRefreshTokenRequest,
} from './commands/update-user-refresh-token.command';
import { AddBankInternalAccountCommand } from '../../models/customer/commands/add-bank-internal-account.command';

@Controller('user')
export class UserController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {
  }

  @Post('update-refresh-token/:id')
  async UpdateUserRefreshToken(@Param('id') userId: number,
                               @Body() request: UpdateUserRefreshTokenRequest) {
    return await this.commandBus.execute(new UpdateUserRefreshTokenCommand(userId, request));
  }

  @Post('add-bank-account/:id')
  async AddBankAccount(@Param('id') userId: number) {
    return await this.commandBus.execute(new AddBankInternalAccountCommand(userId));
  }
}
