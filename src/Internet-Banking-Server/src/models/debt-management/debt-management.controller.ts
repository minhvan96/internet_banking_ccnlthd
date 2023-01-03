import {Body, Controller, Get, Param, Post, Req} from '@nestjs/common';
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
import {CreateDebtorCommand, debtorRequest} from "./commands/create-debtor.command";
import {GetDebtorQuery} from "./queries/get-debtor.query";
import {UpdateDebtTransactionCommand} from "./commands/update-debt-transaction.command";


@ApiTags('Debt Transaction')
@Controller('/debt-management')
export class DebtManagementController {
    constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {
    }

    @Post('/debit-transfer')
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

    @Post('/filter-debt-transaction')
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

    @Post("/add-debtor")
    async AddDebtor(@Req() req: Request, @Body() request: debtorRequest){
        const {user} = req;
        return await this.commandBus.execute(new CreateDebtorCommand(user['sub'], request));
    }

    @Get("/get-debtor")
    async getDebtor(@Req() req: Request){
        const {user} = req
        return await this.queryBus.execute(new GetDebtorQuery(user['sub']))
    }

    @Post("/debt-payment")
    async debtPayment(@Param('id') debtTransactionId: number){
        return await this.commandBus.execute(new UpdateDebtTransactionCommand(debtTransactionId))
    }
}
