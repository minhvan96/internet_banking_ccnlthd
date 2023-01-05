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