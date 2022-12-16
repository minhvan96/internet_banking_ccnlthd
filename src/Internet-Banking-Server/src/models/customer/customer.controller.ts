import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
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
import {
  AddExternalBeneficiaryCommand,
  AddExternalBeneficiaryRequest
} from './commands/add-external-beneficiary.command';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCustomerQuery } from './queries/get-customer.query';
import { Request } from 'express';
import { AccessTokenGuard } from '../../authentication/guards/access-token.guard';
import { GetInternalBeneficiaryQuery } from './queries/get-internal-beneficiary.query';
import { AddBankInternalAccountCommand } from './commands/add-bank-internal-account.command';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus) {
  }

  @Get('/:id')
  async GetCustomer(
    @Param('id') userId: number) {
    return await this.queryBus.execute(new GetCustomerQuery(userId));
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('current/beneficiary')
  async GetCustomerBeneficiary(
    @Req() req: Request) {
    const {user} = req;
    const userId: number = user['sub'];
    return await this.queryBus.execute(new GetInternalBeneficiaryQuery(userId));
  }

  @Post('add-bank-internal-account/:id')
  async AddBankInternalAccount(
    @Param('id') userId: number) {
    return await this.commandBus.execute(new AddBankInternalAccountCommand(userId));
  }

  @Post('internal-transfer/:id')
  async CreateInternalBankTransfer(
    @Param('id') userId: number,
    @Body() request: CreateInternalBankTransferRequest) {
    return await this.commandBus.execute(new CreateInternalBankTransferCommand(userId, request));
  }

  @Post('external-transfer/:id')
  async CreateExternalBankTransfer(
    @Param('id') userId: number,
    @Body() request: CreateExternalBankTransferRequest) {
    return await this.commandBus.execute(new CreateExternalBankTransferCommand(userId, request));
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('add-internal-beneficiary')
  async AddInternalBeneficiary(
    @Req() req: Request,
    @Body() request: AddInternalBeneficiaryRequest) {
    const {user} = req;
    const userId: number = user['sub'];
    return await this.commandBus.execute(new AddInternalBeneficiaryCommand(userId, request));
  }

  @Post('add-external-beneficiary:/id')
  async AddExternalBeneficiary(
    @Param('id') userId: number,
    @Body() request: AddExternalBeneficiaryRequest) {
    return await this.commandBus.execute(new AddExternalBeneficiaryCommand(userId, request));
  }
}
