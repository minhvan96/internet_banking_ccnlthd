import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "../../auth/guards/access-token.guard";
import { Request } from "express";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { MakeDepositCommand, MakeDepositRequest } from "./commands/make-deposit.command";
import { GetDepositQuery } from "./queries/get-deposit.query";

@ApiTags("Deposit")
@Controller("deposit")
export class DepositController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus) {
  }

  @ApiBearerAuth()
  @Post("make-deposit")
  @UseGuards(AccessTokenGuard)
  async makeDeposit(
    @Req() req: Request,
    @Body() request: MakeDepositRequest
  ) {
    const { user } = req;
    const userId: number = user["sub"];
    return await this.commandBus.execute(new MakeDepositCommand(userId, request));
  }

  @ApiBearerAuth()
  @Get(':accountNumber')
  @UseGuards(AccessTokenGuard)
  async getDeposit(
    @Req() req: Request,
    @Param('accountNumber') accountNumber: string,
  ) {
    const { user } = req;
    const userId: number = user["sub"];
    return await this.queryBus.execute(new GetDepositQuery(userId, accountNumber));
  }
}