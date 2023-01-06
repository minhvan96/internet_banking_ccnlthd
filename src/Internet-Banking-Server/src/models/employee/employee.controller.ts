import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "../../auth/guards/access-token.guard";
import { Request } from "express";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { MakeDepositCommand, MakeDepositRequest } from "./commands/make-deposit.command";

@ApiTags("Employee")
@Controller("employee")
export class EmployeeController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus) {
  }

  @ApiBearerAuth()
  @Post("add-deposit")
  @UseGuards(AccessTokenGuard)
  async GetBankInternalTransaction(
    @Req() req: Request,
    @Body() request: MakeDepositRequest
  ) {
    const { user } = req;
    const userId: number = user["sub"];
    return await this.commandBus.execute(new MakeDepositCommand(userId, request));
  }
}