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
    @ApiProperty()
    code: number
}

export class UpdateDebtTransactionResponse{
    constructor(
        public id: number,
        public balance: number,
        public accountLoan: string
    ) {
    }
}