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

export class FilterTransactionResponse{
    @ApiProperty({description:"id of transaction"})
    public id: number;
    @ApiProperty({description: "bank name"})
    public bankName: string;
    @ApiProperty({description: "account number of transaction"})
    public accountNumber: string;
    @ApiProperty({description: "transaction amount"})
    public amount: number;
    @ApiProperty({description: "content transfer"})
    public description: string;
    @ApiProperty({description: "creation date"})
    public creationDate: Date


    constructor(id: number, bankName: string, accountNumber: string, amount: number, description: string, creationDate: Date) {
        this.id = id;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.amount = amount;
        this.description = description;
        this.creationDate = creationDate;
    }
}

export class FilterExternalTransactionResponse{
    @ApiProperty({description: "Transaction information"})
    public transaction: FilterTransactionResponse[];
    @ApiProperty({description: "total amount transaction"})
    public totalAmount: number


    constructor(transaction: FilterTransactionResponse[], totalAmount: number) {
        this.transaction = transaction;
        this.totalAmount = totalAmount;
    }
}