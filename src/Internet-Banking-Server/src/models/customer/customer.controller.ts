import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddBankInternalAccountCommand } from './commands/add-bank-internal-account.command';
import {
  CreateInternalBankTransferCommand,
  CreateInternalBankTransferRequest,
} from './commands/create-internal-bank-transfer.command';
import {
  CreateExternalBankTransferCommand,
  CreateExternalBankTransferRequest,
} from './commands/create-external-bank-transfer.command';

@Controller('customer')
export class CustomerController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {
  }

  @Post('add-bank-internal-account/:id')
  async AddBankInternalAccount(@Param('id') userId: number) {
    return await this.commandBus.execute(new AddBankInternalAccountCommand(userId));
  }

  @Post('internal-transfer/:id')
  async CreateInternalBankTransfer(@Param('id') userId: number,
                                   @Body() request: CreateInternalBankTransferRequest) {
    return await this.commandBus.execute(new CreateInternalBankTransferCommand(userId, request));
  }

  @Post('external-transfer/:id')
  async CreateExternalBankTransfer(@Param('id') userId: number,
                                   @Body() request: CreateExternalBankTransferRequest) {
    return await this.commandBus.execute(new CreateExternalBankTransferCommand(userId, request));
  }
}
