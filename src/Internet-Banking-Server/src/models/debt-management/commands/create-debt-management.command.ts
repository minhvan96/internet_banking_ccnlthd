import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDebtManagementCommand {
    constructor(public readonly payload: CreateDebtManagementRequest) {
    }
}
export class CreateDebtManagementRequest {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    debitAccountNumber: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    loanAccountNumber: string;

    @ApiProperty()
    amount: number;

    @IsString()
    @ApiProperty()
    description: string;
}