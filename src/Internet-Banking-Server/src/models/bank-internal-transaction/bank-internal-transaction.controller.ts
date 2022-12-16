import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../authentication/guards/access-token.guard';
import {
  CreateBankInternalTransactionCommand,
  CreateBankInternalTransactionFromCurrentUserRequest,
  CreateBankInternalTransactionRequest
} from './commands/create-bank-internal-transaction.command';
import { CommandBus } from '@nestjs/cqrs';
import { Request } from 'express';
@ApiTags('Bank Internal Transaction')
@Controller('bank-internal-transaction')
export class BankInternalTransactionController {
  constructor(
    private readonly commandBus: CommandBus) {
  }

  @ApiBearerAuth()
  @Post('transfer')
  @UseGuards(AccessTokenGuard)
  async TransferToInternalAccount(
    @Req() req: Request,
    @Body() request: CreateBankInternalTransactionFromCurrentUserRequest) {
    const {user} = req;
    const userId: number = user['sub'];
    const createTransferRequest = new CreateBankInternalTransactionRequest(userId, request.toAccount, request.transferAmount, request.description);
    return await this.commandBus.execute(new CreateBankInternalTransactionCommand(createTransferRequest));
  }
}
