import {ApiProperty} from "@nestjs/swagger";

export class UpdateDebtTransactionCommand {
    constructor(
        public readonly payload: UpdateDebtTransactionRequest
    ) {
    }
}

export class UpdateDebtTransactionRequest{
    @ApiProperty()
    transactionId: number;
    code: number
}