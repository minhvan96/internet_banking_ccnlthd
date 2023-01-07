import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {
    CreateDebtManagementFromCurrentUserRequest,
    CreateDebtManagementRequest,
    CreateDebtTransactionCommand
} from "./commands/create-debt-transaction.command";
import {Request} from "express";
import {DebtFilterRequest, FilterDebtTransactionQuery} from "./queries/filter-debt-transactions.query";
import {DeleteDebtTransactionCommand, DeleteDebtTransactionRequest} from "./commands/delete-debt-transaction.command";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {CreateDebtorCommand, debtorRequest} from "./commands/create-debtor.command";
import {GetDebtorQuery} from "./queries/get-debtor.query";
import {UpdateDebtTransactionCommand, UpdateDebtTransactionRequest} from "./commands/update-debt-transaction.command";
import {AccessTokenGuard} from "../../auth/guards/access-token.guard";
import {RequestDebtTransactionCommand} from "./commands/request-debt-transaction.command";
import {NotifyDebtTransactionCommand} from "./commands/notify-debt-transaction.command";


@ApiTags('Debt Transaction')
@Controller('/debt-management')
export class DebtManagementController {
    constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus,
                ) {
    }

    @Post('/debit-transfer')
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
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
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    async FilterDebitTransactions(@Req() req: Request,
                    @Body() request: DebtFilterRequest){
        const {user} = req;

        request.userId = user['sub'];

        return await this.queryBus.execute(new FilterDebtTransactionQuery(request));
    }

    @Post("/delete-debt-transaction/:id")
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    async DeleteDebtTransaction(@Req() req: Request,
                                @Param('id') debtTransactionId: number,
                                @Body() request: DeleteDebtTransactionRequest){
        const {user} = req;
        request.debtTransactionId = debtTransactionId;
        request.userId = user['sub'];
        return await this.commandBus.execute(new DeleteDebtTransactionCommand(request));
    }

    @Post("/add-debtor")
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    async AddDebtor(@Req() req: Request, @Body() request: debtorRequest){
        const {user} = req;
        return await this.commandBus.execute(new CreateDebtorCommand(user['sub'], request));
    }

    @Get("/get-debtor")
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    async getDebtor(@Req() req: Request){
        const {user} = req
        return await this.queryBus.execute(new GetDebtorQuery(user['sub']))
    }

    @Get("/debt-payment-request/:transactionId")
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    async debtPaymentRequest(@Req() req: Request, @Param('transactionId') debtTransactionId: number){
        const {user} = req
        return await this.commandBus.execute(new RequestDebtTransactionCommand(user['sub'], debtTransactionId))
    }

    @Post("/debt-payment")
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    async debtPayment(@Body() request: UpdateDebtTransactionRequest){
        return await this.commandBus.execute(new UpdateDebtTransactionCommand(request))
    }

    @Get("/notify")
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    async notify(@Req() req: Request){
        const {user} = req
        return await this.commandBus.execute(new NotifyDebtTransactionCommand(user['sub']))
    }
}
