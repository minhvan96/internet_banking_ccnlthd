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
    constructor(
        public id: number,
        public accountNumber: string,
        public transferAmount: number,
        public description: string,
        public createdDate: Date,
        public updatedDate: Date,
        public isPaid: boolean
    ) {
    }
}