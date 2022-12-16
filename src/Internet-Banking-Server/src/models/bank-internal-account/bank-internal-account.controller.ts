import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetBankInternalAccountByIdQuery } from './queries/get-bank-internal-account-by-id.query';
import { ListBankInternalAccountQuery } from './queries/list-bank-internal-account.query';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../authentication/guards/access-token.guard';
import { Request } from 'express';
import {
  CreateBankInternalTransactionCommand,
  CreateBankInternalTransactionFromCurrentUserRequest,
  CreateBankInternalTransactionRequest
} from '../bank-internal-transaction/commands/create-bank-internal-transaction.command';

@ApiTags('Bank Internal Account')
@Controller('bank-internal-account')
export class BankInternalAccountController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus) {
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async ListBankInternalAccount() {
    return await this.queryBus.execute(new ListBankInternalAccountQuery());
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  async GetBankInternalAccount(@Param('id') accountId: number) {
    return await this.queryBus.execute(new GetBankInternalAccountByIdQuery(accountId));
  }

  @Post('transfer')
  @UseGuards(AccessTokenGuard)
  async TransferToInternalAccount(
    @Req() req: Request,
    @Body() request: CreateBankInternalTransactionFromCurrentUserRequest) {
    const {user} = req;
    const userId: number = user['sub'];
    const createTransferRequest = new CreateBankInternalTransactionRequest(userId, request.to, request.amount, request.description);
    return await this.commandBus.execute(new CreateBankInternalTransactionCommand(createTransferRequest));
  }
}
