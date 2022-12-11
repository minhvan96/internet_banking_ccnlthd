import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
import {
  AddInternalBeneficiaryCommand,
  AddInternalBeneficiaryRequest,
} from './commands/add-internal-beneficiary.command';
import { GetUserQuery } from '../../identity/user/queries/get-user.query';
import {
  AddExternalBeneficiaryCommand,
  AddExternalBeneficiaryRequest
} from './commands/add-external-beneficiary.command';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Customer")
@Controller('customer')
export class CustomerController {
  constructor(private readonly queryBus: QueryBus,
              private readonly commandBus: CommandBus) {
  }

  @Get('/:id')
  async GetCustomer(@Param('id') userId: number) {
    return await this.queryBus.execute(new GetUserQuery(userId));
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

  @Post('add-internal-beneficiary:/id')
  async AddInternalBeneficiary(@Param('id') userId: number,
                               @Body() request: AddInternalBeneficiaryRequest) {
    return await this.commandBus.execute(new AddInternalBeneficiaryCommand(userId, request));
  }

  @Post('add-external-beneficiary:/id')
  async AddExternalBeneficiary(@Param('id') userId: number,
                               @Body() request: AddExternalBeneficiaryRequest) {
    return await this.commandBus.execute(new AddExternalBeneficiaryCommand(userId, request));
  }
}
