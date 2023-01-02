import {Body, Controller, Param, Post, Req} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {
    CreateDebtManagementFromCurrentUserRequest,
    CreateDebtManagementRequest,
    CreateDebtTransactionCommand
} from "./commands/create-debt-transaction.command";
import {Request} from "express";
import {DebtFilterRequest, FilterDebtTransactionQuery} from "./queries/filter-debt-transactions.query";
import {DeleteDebtTransactionCommand, DeleteDebtTransactionRequest} from "./commands/delete-debt-transaction.command";
import {ApiTags} from "@nestjs/swagger";


@ApiTags('Debt Transaction')
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

        return await this.commandBus.execute(new CreateDebtTransactionCommand(dataRequest));
    }

    @Post('filter-debt-transaction')
    async FilterDebitTransactions(@Req() req: Request,
                    @Body() request: DebtFilterRequest){
        const {user} = req;

        request.userId = user['sub'];

        return await this.queryBus.execute(new FilterDebtTransactionQuery(request));
    }

    @Post("/delete-debt-transaction/:id")
    async DeleteDebtTransaction(@Param('id') debtTransactionId: number,
                                @Body() cancelContent: string){
        let data: DeleteDebtTransactionRequest = new DeleteDebtTransactionRequest(debtTransactionId, cancelContent);
        return await this.commandBus.execute(new DeleteDebtTransactionCommand(data));
    }
}
