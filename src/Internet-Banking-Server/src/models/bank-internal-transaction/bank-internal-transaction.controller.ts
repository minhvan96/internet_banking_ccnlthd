import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "../../auth/guards/access-token.guard";
import {
  CreateBankInternalTransactionCommand,
  CreateBankInternalTransactionFromCurrentUserRequest,
  CreateBankInternalTransactionRequest
} from "./commands/create-bank-internal-transaction.command";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Request } from "express";
import {
  GetBankInternalAccountTransactionByUserIdQuery
} from "./queries/get-bank-internal-account-transaction-by-user-id.query";
import {
  VerifyBankInternalTransactionCommand,
  VerifyBankInternalTransactionRequest
} from "./commands/verify-bank-internal-transaction.command";
import { GetBankInternalTransactionByIdQuery } from "./queries/get-bank-internal-transaction-by-id.query";
import {
  GetBankInternalAccountTransactionToByUserIdQuery
} from "./queries/get-bank-internal-account-transaction-to-by-user-id.query";
import { BankInternalTransactionResponseModel } from "./response-models/bank-internal-transaction.response-model";

@ApiTags("Bank Internal Transaction")
@Controller("bank-internal-transaction")
export class BankInternalTransactionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus) {
  }

  @ApiBearerAuth()
  @Post("transfer")
  @UseGuards(AccessTokenGuard)
  async TransferToInternalAccount(
    @Req() req: Request,
    @Body() request: CreateBankInternalTransactionFromCurrentUserRequest) {
    const { user } = req;
    const userId: number = user["sub"];
    const createTransferRequest = new CreateBankInternalTransactionRequest(
      userId,
      request.toAccount,
      request.transferAmount,
      request.transactionPaymentType,
      request.description);
    return await this.commandBus.execute(new CreateBankInternalTransactionCommand(createTransferRequest));
  }

  @ApiBearerAuth()
  @Post("verify")
  @UseGuards(AccessTokenGuard)
  async VerifyInternalTransaction(
    @Body() request: VerifyBankInternalTransactionRequest
  ) {
    return await this.commandBus.execute(new VerifyBankInternalTransactionCommand(request));
  }

  @ApiOkResponse({
    description: "The bank internal transactions",
    type: BankInternalTransactionResponseModel,
    isArray: true
  })
  @ApiBearerAuth()
  @Get()
  @UseGuards(AccessTokenGuard)
  async GetBankInternalTransaction(@Req() req: Request) {
    const { user } = req;
    const userId: number = user["sub"];
    return await this.queryBus.execute(new GetBankInternalAccountTransactionByUserIdQuery(userId));
  }

  @ApiOkResponse({
    description: "The bank internal transaction",
    type: BankInternalTransactionResponseModel
  })
  @ApiBearerAuth()
  @Get("/:id")
  @UseGuards(AccessTokenGuard)
  async GetBankInternalTransactionById(
    @Req() req: Request,
    @Param("id") transferId: number
  ) {
    const { user } = req;
    const userId: number = user["sub"];
    return await this.queryBus.execute(new GetBankInternalTransactionByIdQuery(userId, transferId));
  }

  @ApiOkResponse({
    description: "The bank internal transaction",
    type: BankInternalTransactionResponseModel
  })
  @ApiBearerAuth()
  @Get("transfer/received")
  @UseGuards(AccessTokenGuard)
  async GetBankInternalTransactionTo(@Req() req: Request) {
    const { user } = req;
    const userId: number = user["sub"];
    return await this.queryBus.execute(new GetBankInternalAccountTransactionToByUserIdQuery(userId));
  }
}
