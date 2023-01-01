import {Body, Controller, Post, Req} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {
    CreateDebtManagementCommand,
    CreateDebtManagementFromCurrentUserRequest,
    CreateDebtManagementRequest
} from "./commands/create-debt-management.command";
import {Request} from "express";
import {DebtFilterRequest, GetDebt} from "./queries/get-debt.query";


@Controller('debt-management')
export class DebtManagementController {
    constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {
    }

    @Post('debit-transfer')
    async CreateExternalBankTransfer(@Req() req: Request,
                                     @Body() request: CreateDebtManagementRequest) {

        const {user} = req;
        const userId: number = user['sub'];

        const dataRequest = new CreateDebtManagementFromCurrentUserRequest(
            userId,
            request.loanAccount,
            request.amount,
            request.description)

        return await this.commandBus.execute(new CreateDebtManagementCommand(dataRequest));
    }

    @Post('get-debits')
    async GetDebits(@Req() req: Request,
                    @Body() request: DebtFilterRequest){
        const {user} = req;

        request.userId = user['sub'];

        return await this.queryBus.execute(new GetDebt(request));
    }
}
