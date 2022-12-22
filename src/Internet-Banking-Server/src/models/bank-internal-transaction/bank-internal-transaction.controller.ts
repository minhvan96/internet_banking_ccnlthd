import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../auth/guards/access-token.guard';
import {
  CreateBankInternalTransactionCommand,
  CreateBankInternalTransactionFromCurrentUserRequest,
  CreateBankInternalTransactionRequest
} from './commands/create-bank-internal-transaction.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Request } from 'express';
import {
  GetBankInternalAccountTransactionByUserIdQuery
} from './queries/get-bank-internal-account-transaction-by-user-id.query';

@ApiTags('Bank Internal Transaction')
@Controller('bank-internal-transaction')
export class BankInternalTransactionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus) {
  }

  @ApiBearerAuth()
  @Post('transfer')
  @UseGuards(AccessTokenGuard)
  async TransferToInternalAccount(
    @Req() req: Request,
    @Body() request: CreateBankInternalTransactionFromCurrentUserRequest) {
    const {user} = req;
    const userId: number = user['sub'];
    const createTransferRequest = new CreateBankInternalTransactionRequest(userId,
      request.toAccount,
      request.transferAmount,
      request.transactionPaymentType,
      request.description);
    return await this.commandBus.execute(new CreateBankInternalTransactionCommand(createTransferRequest));
  }

  @ApiBearerAuth()
  @Get()
  @UseGuards(AccessTokenGuard)
  async GetBankInternalTransaction(@Req() req: Request){
    const {user} = req;
    const userId: number = user['sub'];
    return await this.queryBus.execute(new GetBankInternalAccountTransactionByUserIdQuery(userId));
  }
}
