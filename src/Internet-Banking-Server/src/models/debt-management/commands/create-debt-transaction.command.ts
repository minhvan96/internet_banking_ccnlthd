import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDebtTransactionCommand {
    constructor(public readonly payload: CreateDebtManagementFromCurrentUserRequest) {
    }
}
export class CreateDebtManagementRequest {

    @IsString()
    @ApiProperty()
    loanAccount: string;

    @ApiProperty()
    amount: number;

    @IsString()
    @ApiProperty()
    description: string;

    constructor(loanAccount: string, amount: number, description: string) {
        this.loanAccount = loanAccount;
        this.amount = amount;
        this.description = description;
    }
}

export class CreateDebtManagementFromCurrentUserRequest extends CreateDebtManagementRequest{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    fromAccount: string;

    @IsNotEmpty()
    userId: number;

    constructor(
        userId: number,
        toAccount: string,
        amount: number,
        description?: string,
        fromAccount?: string,
    ) {
        super(toAccount, amount, description);
        this.userId = userId;
        this.fromAccount = fromAccount;
    }
}