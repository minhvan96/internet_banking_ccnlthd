import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class FilterDebtTransactionQuery {
    constructor(public readonly payload: DebtFilterRequest) {
    }
}

export class DebtFilterRequest{
    @ApiProperty()
    isCreator: boolean;

    @ApiProperty()
    isUnpaid: boolean;

    @IsNotEmpty()
    userId: number;


    constructor(isCreator: boolean, isUnpaid: boolean, userId: number) {
        this.isCreator = isCreator;
        this.isUnpaid = isUnpaid;
        this.userId = userId;
    }
}

export class DebtFilterResponse {
    @ApiProperty({description: "id for debt transaction"})
    public id: number;
    @ApiProperty({description: "account number"})
    public accountNumber: string;
    @ApiProperty({description: "transfer Amount"})
    public transferAmount: number;
    @ApiProperty({description: "content transaction"})
    public description: string;
    @ApiProperty({description: "creation date"})
    public createdDate: Date;
    @ApiProperty({description: "update date"})
    public updatedDate: Date;
    @ApiProperty({description: "Has the debt been paid?"})
    public isPaid: boolean

    constructor(id: number, accountNumber: string, transferAmount: number, description: string, createdDate: Date, updatedDate: Date, isPaid: boolean) {
        this.id = id;
        this.accountNumber = accountNumber;
        this.transferAmount = transferAmount;
        this.description = description;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.isPaid = isPaid;
    }
}