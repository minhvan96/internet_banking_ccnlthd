import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  UpdateUserRefreshTokenCommand,
  UpdateUserRefreshTokenRequest,
} from './commands/update-user-refresh-token.command';
import { AddBankInternalAccountCommand } from '../../models/customer/commands/add-bank-internal-account.command';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AccessTokenGuard } from '../../auth/guards/access-token.guard';
import { GetUserQuery } from './queries/get-user.query';
import { Roles } from '../../auth/role/roles.decorator';
import { RoleGuard } from '../../auth/role/role.guard';

@UseGuards(RoleGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus) {
  }

  // @Roles('customer')
  @ApiBearerAuth()
  @Get('/current')
  @UseGuards(AccessTokenGuard)
  async GetCurrentUser(@Req() req: Request) {
    const {user} = req;
    const userId: number = user['sub'];
    return await this.queryBus.execute(new GetUserQuery(userId));
  }

  @Post('update-refresh-token/:id')
  async UpdateUserRefreshToken(
    @Param('id') userId: number,
    @Body() request: UpdateUserRefreshTokenRequest) {
    return await this.commandBus.execute(new UpdateUserRefreshTokenCommand(userId, request));
  }

  @Post('add-bank-account/:id')
  async AddBankAccount(
    @Param('id') userId: number) {
    return await this.commandBus.execute(new AddBankInternalAccountCommand(userId));
  }
}
