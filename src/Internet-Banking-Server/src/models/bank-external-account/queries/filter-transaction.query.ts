import {ApiProperty} from "@nestjs/swagger";

export class FilterTransactionQuery{
    constructor(
        public readonly payload: FilterTransactionRequest
    ) {
    }
}

export class FilterTransactionRequest{
    @ApiProperty({description: "time start to filter"})
    public fromDate: Date;

    @ApiProperty({description: "time end to filter"})
    public toDate: Date;
    @ApiProperty({description: "bank to filter"})
    public bank: string


    constructor(fromDate: Date, toDate: Date, bank: string) {
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.bank = bank;
    }
}