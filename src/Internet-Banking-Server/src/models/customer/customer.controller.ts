import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetCustomerQuery } from './queries/get-customer.query';
import { Request } from 'express';
import { AccessTokenGuard } from '../../auth/guards/access-token.guard';
import { GetInternalBeneficiaryQuery } from './queries/get-internal-beneficiary.query';
import { AddBankInternalAccountCommand } from './commands/add-bank-internal-account.command';
import { GetExternalBeneficiaryQuery } from './queries/get-external-beneficiary.query';
import {
  UpdateInternalBeneficiaryCommand,
  UpdateInternalBeneficiaryRequest
} from "./commands/update-internal-beneficiary.command";
import {
  DeleteInternalBeneficiaryCommand,
  DeleteInternalBeneficiaryRequest
} from "./commands/delete-internal-beneficiary.command";
import { GetCustomersQuery } from "./queries/get-customers.query";
import { CustomerResponseModel } from "./response-models/customer.response-model";

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus) {
  }

  @ApiOkResponse({
    description: 'The customer',
    type: CustomerResponseModel
  })
  @Get('/:id')
  async GetCustomer(
    @Param('id') userId: number) {
    return await this.queryBus.execute(new GetCustomerQuery(userId));
  }
  @ApiOkResponse({
    description: 'The customer records',
    type: CustomerResponseModel,
    isArray: true
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get()
  async GetCustomers() {
    return await this.queryBus.execute(new GetCustomersQuery());
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('current/internal-beneficiary')
  async GetCustomerInternalBeneficiary(
    @Req() req: Request) {
    const {user} = req;
    const userId: number = user['sub'];
    return await this.queryBus.execute(new GetInternalBeneficiaryQuery(userId));
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('current/external-beneficiary')
  async GetCustomerExternalBeneficiary(
    @Req() req: Request) {
    const {user} = req;
    const userId: number = user['sub'];
    return await this.queryBus.execute(new GetExternalBeneficiaryQuery(userId));
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
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('add-external-beneficiary')
  async AddExternalBeneficiary(
    @Req() req: Request,
    @Body() request: AddExternalBeneficiaryRequest) {
    const {user} = req;
    const userId: number = user['sub'];
    return await this.commandBus.execute(new AddExternalBeneficiaryCommand(userId, request));
  }
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put('update-external-beneficiary')
  async UpdateExternalBeneficiary(
    @Req() req: Request,
    @Body() request: UpdateInternalBeneficiaryRequest) {
    const {user} = req;
    const userId: number = user['sub'];
    return await this.commandBus.execute(new UpdateInternalBeneficiaryCommand(userId, request));
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete('delete-external-beneficiary')
  async DeleteExternalBeneficiary(
    @Req() req: Request,
    @Body() request: DeleteInternalBeneficiaryRequest) {
    const {user} = req;
    const userId: number = user['sub'];
    return await this.commandBus.execute(new DeleteInternalBeneficiaryCommand(userId, request));
  }
}
