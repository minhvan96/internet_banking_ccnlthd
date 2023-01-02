import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class FilterDebtTransactionQuery {
    constructor(public readonly payload: DebtFilterRequest) {
    }
}

export class DebtFilterRequest{
    @ApiProperty()
    isCreated: boolean;

    @ApiProperty()
    isUnpaid: boolean;

    @IsNotEmpty()
    userId: number;


    constructor(isCreated: boolean, isUnpaid: boolean, userId: number) {
        this.isCreated = isCreated;
        this.isUnpaid = isUnpaid;
        this.userId = userId;
    }
}