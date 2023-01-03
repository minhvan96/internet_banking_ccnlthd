import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateDebtorCommand {
    constructor(
        public readonly userId: number,
        public readonly payload: debtorRequest
    ) {
    }
}

export class debtorRequest{
    @ApiProperty()
    bankAccountNumber: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    alias: string;

    constructor(bankAccountId: string, alias: string) {
        this.bankAccountNumber = bankAccountId;
        this.alias = alias;
    }
}