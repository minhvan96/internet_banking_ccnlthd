import {Body, Controller, Post} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateDebtManagementCommand, CreateDebtManagementRequest} from "./commands/create-debt-management.command";


@Controller('debt-management')
export class DebtManagementController {
    constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {
    }

    @Post('external-transfer/:id')
    async CreateExternalBankTransfer(@Body() request: CreateDebtManagementRequest) {
        return await this.commandBus.execute(new CreateDebtManagementCommand(request));
    }
}
