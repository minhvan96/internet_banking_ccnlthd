import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AccessTokenGuard} from "../../auth/guards/access-token.guard";
import {FilterTransactionQuery, FilterTransactionRequest} from "./queries/filter-transaction.query";
import {QueryBus} from "@nestjs/cqrs";

@Controller('/bank-transaction-controller')
@ApiTags("Bank external transaction")
export class BankTransactionController {

    constructor(private readonly queryBus: QueryBus) {
    }
    @Post("/get-transaction")
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get list of external transactions" })
    @UseGuards(AccessTokenGuard)
    async getTransaction(@Body() request: FilterTransactionRequest){
        return await this.queryBus.execute(new FilterTransactionQuery(request));
    }
}
